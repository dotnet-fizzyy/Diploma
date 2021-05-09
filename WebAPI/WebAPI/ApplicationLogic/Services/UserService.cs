using System;
using System.Threading.Tasks;
using System.Transactions;
using WebAPI.ApplicationLogic.Handlers;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Core.Interfaces.Providers;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models.Authentication;
using WebAPI.Models.Models.Result;
using WebAPI.Models.Models.Models;

namespace WebAPI.ApplicationLogic.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserProvider _userProvider;
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        private readonly IUserMapper _userMapper;

        public UserService(
            IUserRepository userRepository,
            IUserProvider userProvider,
            IRefreshTokenRepository refreshTokenRepository, 
            IUserMapper userMapper
            )
        {
            _userRepository = userRepository;
            _userProvider = userProvider;
            _refreshTokenRepository = refreshTokenRepository;
            _userMapper = userMapper;
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
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, "Unable to find user with provided id");
            }
            
            var userModel = _userMapper.MapToModel(userEntity);

            return userModel;
        }

        public async Task<User> CreateUserWithTeamAsync(User user, Guid teamId)
        {
            var userEntity = _userMapper.MapToEntity(user);
            userEntity.TeamUsers.Add(new Core.Entities.TeamUser { TeamId = teamId });
            
            var createdUserModel = await CreateUser(userEntity);
            
            return createdUserModel;
        }

        public async Task<User> CreateCustomerAsync(SignUpUser user)
        {
            var customerEntity = UserHandler.CreateCustomerEntity(user);
            
            var createdUserModel = await CreateUser(customerEntity);
            
            return createdUserModel;
        }
        
        public async Task<User> CreateUserAsync(User user)
        {
            var entityUser = _userMapper.MapToEntity(user);

            var createdUserModel = await CreateUser(entityUser);
            
            return createdUserModel;
        }

        public async Task<User> UpdateUserAsync(User user)
        {
            var entityUser = _userMapper.MapToEntity(user);

            var entityUpdatedUser = await _userRepository.UpdateItemAsync(entityUser);

            var userModel = _userMapper.MapToModel(entityUpdatedUser);

            return userModel;
        }

        public async Task UpdateUserPasswordAsync(Guid userId, PasswordUpdate passwordUpdate)
        {
            var oldHashedPassword = PasswordHashing.CreateHashPassword(passwordUpdate.OldPassword);
            var newHashedPassword = PasswordHashing.CreateHashPassword(passwordUpdate.NewPassword);
            
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
            var userEntity = _userMapper.MapToEntity(user);

            await _userRepository.UpdateUserAvatarLinkAsync(userEntity);
        }

        public async Task ChangeUserActivityStatusAsync(User user)
        {
            var userEntity = _userMapper.MapToEntity(user);

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
            
            var userModel = _userMapper.MapToModel(createdUserEntity);

            return userModel;
        }
    }
}