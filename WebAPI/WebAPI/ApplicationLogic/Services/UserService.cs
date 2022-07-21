using System;
using System.Threading.Tasks;
using System.Transactions;
using WebAPI.ApplicationLogic.Mappers;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Providers;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models.Result;
using WebAPI.Models.Models.Models;
using WebAPI.Presentation.Models.Request;
using WebAPI.Presentation.Models.Response;

namespace WebAPI.ApplicationLogic.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserProvider _userProvider;
        private readonly IRefreshTokenRepository _refreshTokenRepository;

        public UserService(
            IUserRepository userRepository,
            IUserProvider userProvider,
            IRefreshTokenRepository refreshTokenRepository)
        {
            _userRepository = userRepository;
            _userProvider = userProvider;
            _refreshTokenRepository = refreshTokenRepository;
        }
        
        public async Task<FullUser> GetFullUserAsync(Guid id)
        {
            var userFullModel = await _userProvider.GetFullUser(id);
            
            return userFullModel;
        }

        public async Task<User> GetUserByIdAsync(Guid id)
        {
            var userEntity = await _userRepository.SearchForSingleItemAsync(x => x.Id == id);
            if (userEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND, 
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(id)));
            }
            
            var userModel = UserMapper.Map(userEntity);

            return userModel;
        }

        public async Task<User> CreateUserWithTeamAsync(User user, Guid teamId)
        {
            var userEntity = UserMapper.Map(user);
            userEntity.TeamUsers.Add(new Core.Entities.TeamUser { TeamId = teamId });
            
            var createdUserModel = await CreateUser(userEntity);
            
            return createdUserModel;
        }

        public async Task<User> CreateCustomerAsync(SignUpUserRequestModel userRequestModel)
        {
            var customerEntity = UserUtilities.CreateCustomerEntity(userRequestModel);
            
            var createdUserModel = await CreateUser(customerEntity);
            
            return createdUserModel;
        }
        
        public async Task<User> CreateUserAsync(User user)
        {
            var entityUser = UserMapper.Map(user);

            var createdUserModel = await CreateUser(entityUser);
            
            return createdUserModel;
        }

        public async Task<User> UpdateUserAsync(User user)
        {
            var entityUser = UserMapper.Map(user);

            var entityUpdatedUser = await _userRepository.UpdateItemAsync(entityUser, x => x.Password, x => x.CreationDate);

            var userModel = UserMapper.Map(entityUpdatedUser);

            return userModel;
        }

        public async Task<EmailResponseModel> CheckForEmailExistenceAsync(string email)
        {
            var emailExists = await _userRepository.ExistsAsync(x => x.Email.ToLower() == email.ToLower());

            var emailCheckResult = new EmailResponseModel
            {
                IsEmailExist = emailExists
            };

            return emailCheckResult;
        }

        public async Task UpdateUserPasswordAsync(Guid userId, PasswordUpdateRequestModel passwordUpdateRequestModel)
        {
            var oldHashedPassword = PasswordHashing.CreateHashPassword(passwordUpdateRequestModel.OldPassword);
            var newHashedPassword = PasswordHashing.CreateHashPassword(passwordUpdateRequestModel.NewPassword);
            
            var userEntity = await _userRepository.SearchForSingleItemAsync(x => x.Id == userId && x.Password == oldHashedPassword);
            if (userEntity == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, "Unable to find user with provided id and password");
            }

            userEntity.Password = newHashedPassword;
            await _userRepository.UpdateUserPasswordAsync(userEntity);
        }

        public async Task UpdateUserAvatarAsync(User user)
        {
            var userEntity = UserMapper.Map(user);

            await _userRepository.UpdateUserAvatarLinkAsync(userEntity);
        }

        public async Task ChangeUserActivityStatusAsync(User user)
        {
            var userEntity = UserMapper.Map(user);

            await _userRepository.ChangeUserActivityStatusAsync(userEntity);
        }

        public async Task RemoveUserAsync(Guid id)
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
            
            await _refreshTokenRepository.DeleteAsync(x => x.UserId == id);
            await _userRepository.DeleteAsync(x => x.Id == id);
                
            scope.Complete();
        }

        
        private async Task<User> CreateUser(Core.Entities.User user)
        {
            user.Password = PasswordHashing.CreateHashPassword(user.Password);
            user.CreationDate = DateTime.UtcNow;
            
            var createdUserEntity = await _userRepository.CreateAsync(user);
            
            var userModel = UserMapper.Map(createdUserEntity);

            return userModel;
        }
    }
}