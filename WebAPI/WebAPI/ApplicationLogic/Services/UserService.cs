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

using UserEntity = WebAPI.Core.Entities.User;
using TeamUserEntity = WebAPI.Core.Entities.TeamUser;

namespace WebAPI.ApplicationLogic.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserProvider _userProvider;

        public UserService(IUnitOfWork unitOfWork, IUserProvider userProvider)
        {
            _userProvider = userProvider;
            _unitOfWork = unitOfWork;
        }
        
        public async Task<FullUser> GetFullDescriptionByIdAsync(Guid id) 
            => await _userProvider.GetFullUser(id);

        public async Task<User> GetByIdAsync(Guid id)
        {
            var userEntity = await _unitOfWork.UserRepository.SearchForSingleItemAsync(user => user.Id == id);

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
            userEntity.TeamUsers.Add(new TeamUserEntity { TeamId = teamId });
            
            var createdUserModel = await CreateUser(userEntity);
            
            return createdUserModel;
        }

        public async Task<User> CreateCustomerAsync(SignUpUserRequestModel userRequestModel)
        {
            var customerEntity = UserUtilities.CreateCustomerEntity(userRequestModel);
            
            var createdUserModel = await CreateUser(customerEntity);
            
            return createdUserModel;
        }
        
        public async Task<User> CreateAsync(User user)
        {
            var entityUser = UserMapper.Map(user);

            var createdUserModel = await CreateUser(entityUser);
            
            return createdUserModel;
        }

        public async Task<User> UpdateAsync(User user)
        {
            var entityUser = UserMapper.Map(user);

            _unitOfWork.UserRepository.UpdateItem(
                entityUser, 
                prop => prop.Password,
                prop => prop.CreationDate);

            await _unitOfWork.CommitAsync();
            
            var userModel = UserMapper.Map(entityUser);

            return userModel;
        }

        public async Task<EmailResponseModel> CheckEmailExistenceAsync(string email)
        {
            var emailExists = await _unitOfWork.UserRepository
                .ExistsAsync(user => user.Email.ToLower() == email.ToLower());

            var emailCheckResult = new EmailResponseModel
            {
                IsEmailExist = emailExists
            };

            return emailCheckResult;
        }

        public async Task UpdatePasswordAsync(Guid userId, PasswordUpdateRequestModel passwordUpdateRequestModel)
        {
            var oldHashedPassword = PasswordHashing.CreateHashPassword(passwordUpdateRequestModel.OldPassword);
            var newHashedPassword = PasswordHashing.CreateHashPassword(passwordUpdateRequestModel.NewPassword);
            
            var userEntity = await _unitOfWork.UserRepository
                .SearchForSingleItemAsync(user => 
                    user.Id == userId && 
                    user.Password == oldHashedPassword);
 
            if (userEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND, 
                    "Unable to find user with provided id and password");
            }

            userEntity.Password = newHashedPassword;
            await _unitOfWork.UserRepository.UpdateUserPasswordAsync(userEntity);
        }

        public async Task UpdateAvatarAsync(User user)
        {
            var userEntity = UserMapper.Map(user);

            await _unitOfWork.UserRepository.UpdateUserAvatarLinkAsync(userEntity);
        }

        public async Task ChangeActivityStatusAsync(User user)
        {
            var userEntity = UserMapper.Map(user);

            await _unitOfWork.UserRepository.ChangeUserActivityStatusAsync(userEntity);
        }

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
            
            var userModel = UserMapper.Map(user);

            return userModel;
        }
    }
}