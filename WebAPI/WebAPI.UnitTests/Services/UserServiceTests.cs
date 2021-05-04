using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using FakeItEasy;
using WebAPI.ApplicationLogic.Services;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Core.Interfaces.Providers;
using WebAPI.Models.Models.Result;
using Xunit;

namespace WebAPI.UnitTests.Services
{
    public class UserServiceTests
    {
        [Fact]
        public async Task ShouldGetAllUsers()
        {
            //Arrange
            var userRepository = A.Fake<IUserRepository>();
            var userProvider = A.Fake<IUserProvider>();
            var refreshTokenRepository = A.Fake<IRefreshTokenRepository>();
            var userMapper = A.Fake<IUserMapper>();

            var userEntities = new List<User>
            {
                new User()
            };

            var userModels = new CollectionResponse<Models.Models.Models.User>
            {
                Items = new List<Models.Models.Models.User>
                {
                    new Models.Models.Models.User()
                }
            };
            
            //Act
            A.CallTo(() => userRepository.SearchForMultipleItemsAsync())
                .Returns(userEntities);

            A.CallTo(() => userMapper.MapToModel(userEntities.First()))
                .Returns(userModels.Items.First());
            
            var userService = new UserService(userRepository, userProvider, refreshTokenRepository, userMapper);
            await userService.GetAllUsersAsync();
            
            //Assert
            A.CallTo(() => userRepository.SearchForMultipleItemsAsync())
                .MustHaveHappenedOnceExactly();

            A.CallTo(() => userMapper.MapToModel(userEntities.First()))
                .MustHaveHappened();
        }
        
        [Fact]
        public async Task ShouldGetExactUser()
        {
            //Arrange
            var userRepository = A.Fake<IUserRepository>();
            var userProvider = A.Fake<IUserProvider>();
            var refreshTokenRepository = A.Fake<IRefreshTokenRepository>();
            var userMapper = A.Fake<IUserMapper>();

            var userId = new Guid();

            var userEntity = new User
            {
                Id = userId
            };

            var userModel = new Models.Models.Models.User
            {
                UserId = userId
            };

            //Act
            A.CallTo(() => userRepository.SearchForSingleItemAsync(A<Expression<Func<User, bool>>>._))
                .Returns(userEntity);

            A.CallTo(() => userMapper.MapToModel(userEntity))
                .Returns(userModel);
            
            var userService = new UserService(userRepository, userProvider, refreshTokenRepository, userMapper);
            var result = await userService.GetUserByIdAsync(userId);
            
            //Assert
            Assert.Equal(userModel.UserId, result.UserId);
            
            A.CallTo(() => userRepository.SearchForSingleItemAsync(A<Expression<Func<User, bool>>>._))
                .MustHaveHappenedOnceExactly();

            A.CallTo(() => userMapper.MapToModel(userEntity))
                .MustHaveHappenedOnceExactly();
        }
    }
}