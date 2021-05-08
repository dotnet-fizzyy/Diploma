using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using FakeItEasy;
using WebAPI.ApplicationLogic.Services;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Core.Interfaces.Providers;
using Xunit;

namespace WebAPI.UnitTests.Services
{
    public class UserServiceTests
    {
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