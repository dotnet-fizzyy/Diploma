using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using FakeItEasy;
using WebAPI.ApplicationLogic.Services;
using WebAPI.Core.Entities;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Providers;
using WebAPI.Models.Enums;
using WebAPI.Presentation.Models.Request;
using Xunit;

namespace WebAPI.UnitTests.Services
{
    public class UserServiceTests
    {
        [Fact]
        public async Task ShouldGetUserByIdAsync()
        {
            //Arrange
            var userRepository = A.Fake<IUserRepository>();
            var userProvider = A.Fake<IUserProvider>();
            var refreshTokenRepository = A.Fake<IRefreshTokenRepository>();

            var userId = new Guid();

            var userEntity = new User
            {
                Id = userId
            };

            var userModel = new Models.Models.Models.User
            {
                UserId = userId
            };

            A.CallTo(() => userRepository.SearchForSingleItemAsync(A<Expression<Func<User, bool>>>._))
                .Returns(userEntity);

            var userService = new UserService(userRepository, userProvider, refreshTokenRepository);

            //Act
            var result = await userService.GetUserByIdAsync(userId);
            
            //Assert
            Assert.Equal(userModel.UserId, result.UserId);
            
            A.CallTo(() => userRepository.SearchForSingleItemAsync(A<Expression<Func<User, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task ShouldThrowErrorOnMissingUserEntity()
        {
            //Arrange
            var userRepository = A.Fake<IUserRepository>();
            var userProvider = A.Fake<IUserProvider>();
            var refreshTokenRepository = A.Fake<IRefreshTokenRepository>();
            
            var userService = new UserService(userRepository, userProvider, refreshTokenRepository);

            var userId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            
            A.CallTo(() => userRepository.SearchForSingleItemAsync(A<Expression<Func<User, bool>>>._))
                .Returns((User)null);
            
            //Act && Assert
            await Assert.ThrowsAsync<UserFriendlyException>(async () =>  await userService.GetUserByIdAsync(userId));
            
            A.CallTo(() => userRepository.SearchForSingleItemAsync(A<Expression<Func<User, bool>>>._))
                .MustHaveHappened();
        }

        [Fact]
        public async Task ShouldCreateCustomerAsync()
        {
            //Arrange
            var userRepository = A.Fake<IUserRepository>();
            var userProvider = A.Fake<IUserProvider>();
            var refreshTokenRepository = A.Fake<IRefreshTokenRepository>();

            var userService = new UserService(userRepository, userProvider, refreshTokenRepository);

            var signUpModel = new SignUpUserRequestModel
            {
                Email = "UserName",
                Password = "123",
                UserName = "email@test.com"
            };

            var userEntity = new User
            {
                Id = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec"),
                UserName = signUpModel.Email,
                Email = signUpModel.UserName,
                UserPosition = Core.Enums.UserPosition.Customer,
                UserRole = Core.Enums.UserRole.Manager,
                CreationDate = DateTime.UtcNow
            };
            
            var expectedUserModel = new Models.Models.Models.User
            {
                UserName = "UserName",
                UserPosition = UserPosition.Customer,
                UserRole = UserRole.Manager,
                CreationDate = DateTime.UtcNow
            };
            
            A.CallTo(() => userRepository.CreateAsync(A<User>._))
                .Returns(userEntity);
            
            //Act
            var result = await userService.CreateCustomerAsync(signUpModel);

            //Assert
            AssertUsers(expectedUserModel, result);
            
            A.CallTo(() => userRepository.CreateAsync(A<User>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldCreateUserAsync()
        {
            //Arrange
            var userRepository = A.Fake<IUserRepository>();
            var userProvider = A.Fake<IUserProvider>();
            var refreshTokenRepository = A.Fake<IRefreshTokenRepository>();
            
            var userService = new UserService(userRepository, userProvider, refreshTokenRepository);

            var userModel = new Models.Models.Models.User
            {
                UserName = "UserNamee",
                Password = "12345",
                UserPosition = UserPosition.Qa,
                UserRole = UserRole.Engineer
            };
            
            var userEntity = new User
            {
                UserName = "UserNamee",
                UserPosition = Core.Enums.UserPosition.Qa,
                UserRole = Core.Enums.UserRole.Engineer,
                CreationDate = DateTime.UtcNow
            };
            
            var expectedUserModel = new Models.Models.Models.User
            {
                UserName = "UserNamee",
                UserPosition = UserPosition.Qa,
                UserRole = UserRole.Engineer,
                CreationDate = DateTime.UtcNow
            };

            A.CallTo(() => userRepository.CreateAsync(A<User>._))
                .Returns(userEntity);
            
            //Act
            var result = await userService.CreateUserAsync(userModel);

            //Assert
            AssertUsers(expectedUserModel, result);

            A.CallTo(() => userRepository.CreateAsync(A<User>._))
                .MustHaveHappened();
        }

        [Fact]
        public async Task ShouldCreateUserWithTeamAsync()
        {
            //Arrange
            var userRepository = A.Fake<IUserRepository>();
            var userProvider = A.Fake<IUserProvider>();
            var refreshTokenRepository = A.Fake<IRefreshTokenRepository>();
            
            var userService = new UserService(userRepository, userProvider, refreshTokenRepository);

            var teamId = Guid.NewGuid();
            
            var userModel = new Models.Models.Models.User
            {
                UserName = "UserNamee",
                Password = "12345",
                UserPosition = UserPosition.Qa,
                UserRole = UserRole.Engineer
            };
            
            var userEntity = new User
            {
                UserName = "UserNamee",
                UserPosition = Core.Enums.UserPosition.Qa,
                UserRole = Core.Enums.UserRole.Engineer,
                CreationDate = DateTime.UtcNow,
                TeamUsers = new List<TeamUser>
                {
                    new TeamUser
                    {
                        TeamId = teamId,
                    }
                }
            };
            
            var expectedUserModel = new Models.Models.Models.User
            {
                UserName = "UserNamee",
                UserPosition = UserPosition.Qa,
                UserRole = UserRole.Engineer,
                CreationDate = DateTime.UtcNow,
            };

            A.CallTo(() => userRepository.CreateAsync(A<User>._))
                .Returns(userEntity);
            
            //Act
            var result = await userService.CreateUserWithTeamAsync(userModel, teamId);

            //Assert
            AssertUsers(expectedUserModel, result);
            
            A.CallTo(() => userRepository.CreateAsync(A<User>._))
                .MustHaveHappened();
        }
        
        [Fact]
        public async Task ShouldUpdateUserAsync()
        {
            //Arrange
            var userRepository = A.Fake<IUserRepository>();
            var userProvider = A.Fake<IUserProvider>();
            var refreshTokenRepository = A.Fake<IRefreshTokenRepository>();
            
            var userService = new UserService(userRepository, userProvider, refreshTokenRepository);

            var userModel = new Models.Models.Models.User
            {
                UserName = "UserNamee",
                Password = "12345",
                UserPosition = UserPosition.Qa,
                UserRole = UserRole.Engineer
            };
            
            var userEntity = new User
            {
                UserName = "UserNamee",
                UserPosition = Core.Enums.UserPosition.Qa,
                UserRole = Core.Enums.UserRole.Engineer,
                CreationDate = DateTime.UtcNow
            };
            
            var expectedUserModel = new Models.Models.Models.User
            {
                UserName = "UserNamee",
                UserPosition = UserPosition.Qa,
                UserRole = UserRole.Engineer,
                CreationDate = DateTime.UtcNow
            };

            A.CallTo(() => userRepository.UpdateItemAsync(A<User>._, A<Expression<Func<User, object>>>._, A<Expression<Func<User, object>>>._))
                .Returns(userEntity);
            
            //Act
            var result = await userService.UpdateUserAsync(userModel);

            //Assert
            AssertUsers(expectedUserModel, result);
            
            A.CallTo(() => userRepository.UpdateItemAsync(A<User>._, A<Expression<Func<User, object>>>._, A<Expression<Func<User, object>>>._))
                .Returns(userEntity);
        }
        
        [Fact]
        public async Task ShouldRemoveUserAsync()
        {
            //Arrange
            var userRepository = A.Fake<IUserRepository>();
            var userProvider = A.Fake<IUserProvider>();
            var refreshTokenRepository = A.Fake<IRefreshTokenRepository>();

            var userId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");

            A.CallTo(() => userRepository.DeleteAsync(A<Expression<Func<User, bool>>>._)).DoesNothing();
            A.CallTo(() => refreshTokenRepository.DeleteAsync(A<Expression<Func<RefreshToken, bool>>>._)).DoesNothing();

            var userService = new UserService(userRepository, userProvider, refreshTokenRepository);
            
            //Act
            await userService.RemoveUserAsync(userId);

            //Assert
            A.CallTo(() => userRepository.DeleteAsync(A<Expression<Func<User, bool>>>._))
                .MustHaveHappened();
            A.CallTo(() => refreshTokenRepository.DeleteAsync(A<Expression<Func<RefreshToken, bool>>>._))
                .MustHaveHappened();
        }

        [Fact]
        public async Task ShouldUpdateUserPasswordAsync()
        {
            //Arrange
            var userRepository = A.Fake<IUserRepository>();
            var userProvider = A.Fake<IUserProvider>();
            var refreshTokenRepository = A.Fake<IRefreshTokenRepository>();

            var userId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var passwordUpdate = new PasswordUpdateRequestModel
            {
                OldPassword = "123",
                NewPassword = "312"
            };
            
            var userEntity = new User
            {
                Id = userId,
                UserName = "UserNamee",
                UserPosition = Core.Enums.UserPosition.Qa,
                UserRole = Core.Enums.UserRole.Engineer,
                CreationDate = DateTime.UtcNow
            };

            A.CallTo(() => userRepository.SearchForSingleItemAsync(A<Expression<Func<User, bool>>>._))
                .Returns(userEntity);
            A.CallTo(() => userRepository.UpdateUserPasswordAsync(A<User>._))
                .DoesNothing();
            
            var userService = new UserService(userRepository, userProvider, refreshTokenRepository);
            
            //Act
            await userService.UpdateUserPasswordAsync(userId, passwordUpdate);

            //Assert
            A.CallTo(() => userRepository.SearchForSingleItemAsync(A<Expression<Func<User, bool>>>._))
                .MustHaveHappened();
            A.CallTo(() => userRepository.UpdateUserPasswordAsync(A<User>._))
                .MustHaveHappened();
        }

        [Fact]
        public async Task ShouldThrowErrorOnUpdateUserPasswordAsync()
        {
            //Arrange
            var userRepository = A.Fake<IUserRepository>();
            var userProvider = A.Fake<IUserProvider>();
            var refreshTokenRepository = A.Fake<IRefreshTokenRepository>();

            var userId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var passwordUpdate = new PasswordUpdateRequestModel
            {
                OldPassword = "123",
                NewPassword = "312"
            };

            A.CallTo(() => userRepository.SearchForSingleItemAsync(A<Expression<Func<User, bool>>>._))
                .Returns((User)null);

            var userService = new UserService(userRepository, userProvider, refreshTokenRepository);
            
            //Act && Assert
            await Assert.ThrowsAsync<UserFriendlyException>(async () => await userService.UpdateUserPasswordAsync(userId, passwordUpdate));

            A.CallTo(() => userRepository.SearchForSingleItemAsync(A<Expression<Func<User, bool>>>._))
                .MustHaveHappened();
            A.CallTo(() => userRepository.UpdateUserPasswordAsync(A<User>._))
                .MustNotHaveHappened();
        }

        [Fact]
        public async Task ShouldUpdateUserAvatarAsync()
        {
            //Arrange
            var userRepository = A.Fake<IUserRepository>();
            var userProvider = A.Fake<IUserProvider>();
            var refreshTokenRepository = A.Fake<IRefreshTokenRepository>();
            
            var user = new Models.Models.Models.User
            {
                UserId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec"),
                AvatarLink = "link"
            };
            
            A.CallTo(() => userRepository.UpdateUserAvatarLinkAsync(A<User>._))
                .DoesNothing();
            
            var userService = new UserService(userRepository, userProvider, refreshTokenRepository);
            
            //Act
            await userService.UpdateUserAvatarAsync(user);

            //Assert
            A.CallTo(() => userRepository.UpdateUserAvatarLinkAsync(A<User>._))
                .MustHaveHappened();
        }

        [Fact]
        public async Task ShouldChangeUserActivityStatusAsync()
        {
            //Arrange
            var userRepository = A.Fake<IUserRepository>();
            var userProvider = A.Fake<IUserProvider>();
            var refreshTokenRepository = A.Fake<IRefreshTokenRepository>();
            
            var user = new Models.Models.Models.User
            {
                UserId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec"),
                AvatarLink = "link"
            };
            
            A.CallTo(() => userRepository.ChangeUserActivityStatusAsync(A<User>._))
                .DoesNothing();
            
            var userService = new UserService(userRepository, userProvider, refreshTokenRepository);
            
            //Act
            await userService.ChangeUserActivityStatusAsync(user);

            //Assert
            A.CallTo(() => userRepository.ChangeUserActivityStatusAsync(A<User>._))
                .MustHaveHappened();
        }
        
        
        private static void AssertUsers(Models.Models.Models.User expectedUserModel, Models.Models.Models.User result)
        {
            Assert.Null(result.Password);
            Assert.Equal(expectedUserModel.UserName, result.UserName);
            Assert.Equal(expectedUserModel.UserPosition, result.UserPosition);
            Assert.Equal(expectedUserModel.UserRole, result.UserRole);
            Assert.Equal(expectedUserModel.CreationDate.Date, result.CreationDate.Date);
        }
    }
}