using System;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models;
using WebAPI.Models.Result;

namespace WebAPI.ApplicationLogic.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        private readonly IUserMapper _userMapper;
        
        public UserService(
            IUserRepository userRepository, 
            IRefreshTokenRepository refreshTokenRepository, 
            IUserMapper userMapper
            )
        {
            _userRepository = userRepository;
            _refreshTokenRepository = refreshTokenRepository;
            _userMapper = userMapper;
        }
        
        public async Task<CollectionResponse<User>> GetAllUsers()
        {
            var userEntities = await _userRepository.SearchForMultipleItemsAsync();

            var collectionResponse = new CollectionResponse<User>
            {
                Items = userEntities.Select(_userMapper.MapToModel).ToList()
            };

            return collectionResponse;
        }

        public async Task<User> GetUser(Guid id)
        {
            var userEntity = await _userRepository.SearchForSingleItemAsync(x => x.UserId == id);

            if (userEntity == null)
            {
                return null;
            }
            
            var userModel = _userMapper.MapToModel(userEntity);

            return userModel;
        }

        public async Task<User> CreateUser(User user)
        {
            var entityUser = _userMapper.MapToEntity(user);

            var createdUserEntity = await _userRepository.CreateAsync(entityUser);

            var userModel = _userMapper.MapToModel(createdUserEntity);

            return userModel;
        }

        public async Task<User> UpdateUser(User user)
        {
            var entityUser = _userMapper.MapToEntity(user);

            var entityUpdatedUser = await _userRepository.UpdateItemAsync(entityUser);

            var userModel = _userMapper.MapToModel(entityUpdatedUser);

            return userModel;
        }

        public async Task RemoveUser(Guid id)
        {
            using (var scope = new TransactionScope
                (
                    TransactionScopeOption.Required, 
                    new TransactionOptions
                    {
                        IsolationLevel = IsolationLevel.Serializable,
                    },
                    TransactionScopeAsyncFlowOption.Enabled
                )
            )
            {
                await _refreshTokenRepository.DeleteAsync(x => x.UserId == id);
                await _userRepository.DeleteAsync(x => x.UserId == id);
                
                scope.Complete();
            }
        }
    }
}