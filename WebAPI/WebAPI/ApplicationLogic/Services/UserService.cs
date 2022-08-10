using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using WebAPI.ApplicationLogic.Mappers;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Configuration;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Basic;
using WebAPI.Models.Complete;
using WebAPI.Presentation.Constants;
using WebAPI.Presentation.Models.Request;
using WebAPI.Presentation.Models.Response;

using UserEntity = WebAPI.Core.Entities.User;
using ProjectEntity = WebAPI.Core.Entities.Project;
using TeamEntity = WebAPI.Core.Entities.Team;
using TeamUserEntity = WebAPI.Core.Entities.TeamUser;

namespace WebAPI.ApplicationLogic.Services
{
    /// <inheritdoc cref="IUserService" />
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICacheContext _cacheContext;
        private readonly AppSettings _appSettings;

        public UserService(IUnitOfWork unitOfWork, ICacheContext cacheContext, AppSettings appSettings)
        {
            _unitOfWork = unitOfWork;
            _cacheContext = cacheContext;
            _appSettings = appSettings;
        }

        /// <inheritdoc cref="IUserService.GetCompleteDescriptionAsync" />
        public async Task<UserComplete> GetCompleteDescriptionAsync(Guid id)
        {
            UserComplete user;
            
            if (_appSettings.Redis.EnableRedis)
            {
                user = await GetUserFromCache(id);

                if (user != null)
                {
                    return user;
                }
            }

            user = await GetFullUserDescriptionAsync(id);

            if (_appSettings.Redis.EnableRedis)
            {
                await SetUserToCache(user);
            }

            return user;
        }
        
        /// <inheritdoc cref="IUserService.GetByIdAsync" />
        public async Task<User> GetByIdAsync(Guid id)
        {
            var userEntity = await _unitOfWork.UserRepository.SearchForItemById(id, includeTracking: false);

            if (userEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND, 
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(id)));
            }

            return UserMapper.Map(userEntity);
        }

        /// <inheritdoc cref="IUserService.AuthenticateUserAsync" />
        public async Task<AuthenticationUserResponseModel> AuthenticateUserAsync(SignInUserRequestModel signInUser)
        {
            var authUser = await AuthenticateUserAsync(signInUser.Email, signInUser.Password);
            var fullUser = await GetFullUserDescriptionAsync(authUser.Id);

            return await GenerateAuthTokensAsync(fullUser);
        }

        /// <inheritdoc cref="IUserService.CreateUserAndAssignToTeamAsync" />
        public async Task<User> CreateUserAndAssignToTeamAsync(User user, Guid teamId)
        {
            var userEntity = UserMapper.Map(user);
            userEntity.TeamUsers.Add(new TeamUserEntity { TeamId = teamId });
            
            return await CreateUser(userEntity);
        }

        /// <inheritdoc cref="IUserService.RegisterUserAsync" />
        public async Task<User> RegisterUserAsync(SignUpUserRequestModel userRequestModel)
        {
            var customerEntity = UserUtilities.CreateCustomerEntity(userRequestModel);

            return await CreateUser(customerEntity);
        }
        
        /// <inheritdoc cref="IUserService.CreateAsync" />
        public async Task<User> CreateAsync(User user)
        {
            var entityUser = UserMapper.Map(user);

            return await CreateUser(entityUser);
        }

        /// <inheritdoc cref="IUserService.UpdateAsync" />
        public async Task<User> UpdateAsync(User user)
        {
            var entityUser = UserMapper.Map(user);

            _unitOfWork.UserRepository.UpdateItem(
                entityUser, 
                prop => prop.Email,
                prop => prop.UserName,
                prop => prop.AvatarLink,
                prop => prop.IsActive,
                prop => prop.UserRole,
                prop => prop.UserPosition);

            await _unitOfWork.CommitAsync();

            return UserMapper.Map(entityUser);
        }

        /// <inheritdoc cref="IUserService.CheckEmailExistenceAsync" />
        public async Task<EmailResponseModel> CheckEmailExistenceAsync(string email)
        {
            var emailExists = await _unitOfWork.UserRepository
                .ExistsAsync(user => user.Email.ToLower() == email.ToLower());

            return new EmailResponseModel
            {
                IsEmailExist = emailExists
            };
        }

        /// <inheritdoc cref="IUserService.UpdatePasswordAsync" />
        public async Task UpdatePasswordAsync(Guid userId, PasswordUpdateRequestModel passwordUpdateRequestModel)
        {
            var oldHashedPassword = PasswordHashing.CreateHashPassword(passwordUpdateRequestModel.OldPassword);
            var newHashedPassword = PasswordHashing.CreateHashPassword(passwordUpdateRequestModel.NewPassword);
            
            var userEntity = await _unitOfWork.UserRepository
                .SearchForSingleItemAsync(
                    user => user.Id == userId && user.Password == oldHashedPassword, 
                    includeTracking: false);
 
            if (userEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND, 
                    "Unable to find user with provided id and password");
            }

            userEntity.Password = newHashedPassword;

            _unitOfWork.UserRepository.UpdateItem(userEntity, prop => prop.Password);

            await _unitOfWork.CommitAsync();
        }

        /// <inheritdoc cref="IUserService.UpdateAvatarAsync" />
        public async Task UpdateAvatarAsync(User user)
        {
            var userEntity = UserMapper.Map(user);

            _unitOfWork.UserRepository.UpdateItem(userEntity, prop => prop.AvatarLink);

            await _unitOfWork.CommitAsync();
        }

        /// <inheritdoc cref="IUserService.ChangeActivityStatusAsync" />
        public async Task ChangeActivityStatusAsync(User user)
        {
            var userEntity = UserMapper.Map(user);

            _unitOfWork.UserRepository.UpdateItem(userEntity, prop => prop.IsActive);
            
            await _unitOfWork.CommitAsync();
        }

        /// <inheritdoc cref="IUserService.RemoveAsync" />
        public async Task RemoveAsync(Guid id)
        {
            using var scope = new TransactionScope
            (
                TransactionScopeOption.Required, 
                new TransactionOptions
                {
                    IsolationLevel = IsolationLevel.Serializable,
                },
                TransactionScopeAsyncFlowOption.Enabled
            );
            
            _unitOfWork.RefreshTokenRepository.Remove(refreshToken => refreshToken.UserId == id);
            _unitOfWork.UserRepository.Remove(user => user.Id == id);

            await _unitOfWork.CommitAsync();
            
            scope.Complete();
        }


        private async Task<User> CreateUser(UserEntity user)
        {
            user.Password = PasswordHashing.CreateHashPassword(user.Password);
            user.CreationDate = DateTime.UtcNow;
            
            await _unitOfWork.UserRepository.CreateAsync(user);
            
            await _unitOfWork.CommitAsync();

            return UserMapper.Map(user);
        }

        private async Task<UserEntity> AuthenticateUserAsync(string email, string password)
        {
            var hashPassword = PasswordHashing.CreateHashPassword(password);
            var authUser = await _unitOfWork.UserRepository.AuthenticateUser(email, hashPassword);

            if (authUser == null)
            {
                throw new UserFriendlyException(ErrorStatus.INVALID_DATA, "Unable to authenticate user");
            }

            return authUser;
        }

        private async Task<UserComplete> GetFullUserDescriptionAsync(Guid userId)
        {
            var userEntity = await _unitOfWork.UserRepository.SearchForItemById(
                userId, 
                includeTracking: false,
                include => include.TeamUsers);
            
            if (userEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND, 
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(userId)));
            }
            
            ICollection<TeamEntity> teamEntities = null;
            ICollection<ProjectEntity> projectEntities = null;
            
            if (userEntity.TeamUsers.Any())
            {
                teamEntities = await _unitOfWork.TeamRepository.GetUserTeams(userEntity.Id);
                projectEntities = await GetProjectsByUser(userEntity, teamEntities);
            }

            return UserMapper.Map(userEntity, projectEntities, teamEntities);
        }

        private async Task<List<ProjectEntity>> GetProjectsByUser(UserEntity user, IEnumerable<TeamEntity> teams)
        {
            if (user.UserPosition == UserPosition.Customer)
            {
                return await _unitOfWork.ProjectRepository
                    .SearchForMultipleItemsAsync(project => project.WorkSpaceId == user.WorkSpaceId);
            }

            return await _unitOfWork.ProjectRepository.GetProjectsByCollectionOfTeamIds(teams);
        }

        private async Task<UserComplete> GetUserFromCache(Guid userId) =>
           await _cacheContext.Get<UserComplete>(RedisUtilities.CreateRedisKeyForUser(userId));
        
        private async Task SetUserToCache(UserComplete user)
        {
            var userKey = RedisUtilities.CreateRedisKeyForUser(user.UserId);
 
            await _cacheContext.Set(userKey, user, TimeSpan.FromHours(1));
        }
        
        private async Task<string> GenerateRefreshTokenForAuthedUser(Guid userId)
        {
            var existingToken = await _unitOfWork.RefreshTokenRepository
                .SearchForSingleItemAsync(token => token.UserId == userId, includeTracking: false);
 
            if (existingToken != null)
            {
                return existingToken.Value;
            }
            
            var refreshTokenEntity = TokenGenerator.GenerateRefreshTokenEntity(
                userId,
                _appSettings.Token.LifeTime);

            await _unitOfWork.RefreshTokenRepository.CreateAsync(refreshTokenEntity);

            await _unitOfWork.CommitAsync();

            return refreshTokenEntity.Value;
        }

        private async Task<AuthenticationUserResponseModel> GenerateAuthTokensAsync(UserComplete user)
        {
            var accessToken = TokenGenerator.GenerateAccessToken(
                _appSettings, 
                user.UserId, 
                user.UserName, 
                user.UserRole.ToString());
            
            Token refreshToken = null;

            if (_appSettings.Token.EnableRefreshTokenVerification)
            {
                var refreshTokenValue = await GenerateRefreshTokenForAuthedUser(user.UserId);
                
                refreshToken = new Token(TokenTypes.Refresh, refreshTokenValue);
            }

            return new AuthenticationUserResponseModel
            {
                AccessToken = new Token(TokenTypes.Access, accessToken),
                RefreshToken = refreshToken,
                User = user
            };
        } 
    }
}