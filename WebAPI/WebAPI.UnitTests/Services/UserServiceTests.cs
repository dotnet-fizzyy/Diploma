using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using FakeItEasy;
using WebAPI.ApplicationLogic.Services;
using WebAPI.Core.Configuration;
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
        // todo: refactor tests later
        [Fact]
        public async Task ShouldGetUserByIdAsync()
        {
            //Arrange
            var unitOfWork = A.Fake<IUnitOfWork>();
            var cacheContext = A.Fake<ICacheContext>();
            var appSettings = new AppSettings();
            
            var userService = new UserService(unitOfWork, cacheContext, appSettings);

            var userId = new Guid();

            var userEntity = new User
            {
                Id = userId
            };

            var userModel = new Models.Models.Models.User
            {
                UserId = userId
            };

            // A.CallTo(() => userRepository.SearchForSingleItemAsync(A<Expression<Func<User, bool>>>._))
            //    .Returns(userEntity);

            //Act
            var result = await userService.GetByIdAsync(userId);
            
            //Assert
            Assert.Equal(userModel.UserId, result.UserId);
            
            // A.CallTo(() => userRepository.SearchForSingleItemAsync(A<Expression<Func<User, bool>>>._))
            //    .MustHaveHappenedOnceExactly();
        }
        
        // todo: refactor tests later
        [Fact]
        public async Task ShouldThrowErrorOnMissingUserEntity()
        {
            //Arrange
            var unitOfWork = A.Fake<IUnitOfWork>();
            var cacheContext = A.Fake<ICacheContext>();
            var appSettings = new AppSettings();
            
            var userService = new UserService(unitOfWork, cacheContext, appSettings);

            var userId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            
            // A.CallTo(() => userRepository.SearchForSingleItemAsync(A<Expression<Func<User, bool>>>._))
            //    .Returns((User)null);
            
            //Act && Assert
            await Assert.ThrowsAsync<UserFriendlyException>(async () =>  await userService.GetByIdAsync(userId));
            
            // A.CallTo(() => userRepository.SearchForSingleItemAsync(A<Expression<Func<User, bool>>>._))
            //    .MustHaveHappened();
        }
        
        // todo: refactor tests later
        [Fact]
        public async Task ShouldCreateCustomerAsync()
        {
            //Arrange
            var unitOfWork = A.Fake<IUnitOfWork>();
            var cacheContext = A.Fake<ICacheContext>();
            var appSettings = new AppSettings();
            
            var userService = new UserService(unitOfWork, cacheContext, appSettings);

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
            
            // A.CallTo(() => userRepository.CreateAsync(A<User>._))
            //    .Returns(userEntity);
            
            //Act
            var result = await userService.CreateCustomerAsync(signUpModel);

            //Assert
            AssertUsers(expectedUserModel, result);
            
            // A.CallTo(() => userRepository.CreateAsync(A<User>._))
            //    .MustHaveHappenedOnceExactly();
        }
        
        // todo: refactor tests later
        [Fact]
        public async Task ShouldCreateUserAsync()
        {
            //Arrange
            var unitOfWork = A.Fake<IUnitOfWork>();
            var cacheContext = A.Fake<ICacheContext>();
            var appSettings = new AppSettings();
            
            var userService = new UserService(unitOfWork, cacheContext, appSettings);

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

            // A.CallTo(() => userRepository.CreateAsync(A<User>._))
            //    .Returns(userEntity);
            
            //Act
            var result = await userService.CreateAsync(userModel);

            //Assert
            AssertUsers(expectedUserModel, result);

            // A.CallTo(() => userRepository.CreateAsync(A<User>._))
            //    .MustHaveHappened();
        }

        // todo: refactor tests later
        [Fact]
        public async Task ShouldCreateUserWithTeamAsync()
        {
            //Arrange
            var unitOfWork = A.Fake<IUnitOfWork>();
            var cacheContext = A.Fake<ICacheContext>();
            var appSettings = new AppSettings();
            
            var userService = new UserService(unitOfWork, cacheContext, appSettings);

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

            // A.CallTo(() => userRepository.CreateAsync(A<User>._))
            //    .Returns(userEntity);
            
            //Act
            var result = await userService.CreateUserWithTeamAsync(userModel, teamId);

            //Assert
            AssertUsers(expectedUserModel, result);
            
            // A.CallTo(() => userRepository.CreateAsync(A<User>._))
            //    .MustHaveHappened();
        }
        
        // todo: refactor tests later
        [Fact]
        public async Task ShouldUpdateUserAsync()
        {
            var unitOfWork = A.Fake<IUnitOfWork>();
            var cacheContext = A.Fake<ICacheContext>();
            var appSettings = new AppSettings();
            
            var userService = new UserService(unitOfWork, cacheContext, appSettings);

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

            // A.CallTo(() => userRepository.UpdateItem(A<User>._, A<Expression<Func<User, object>>>._, A<Expression<Func<User, object>>>._))
            //    .Returns(userEntity);
            
            //Act
            var result = await userService.UpdateAsync(userModel);

            //Assert
            AssertUsers(expectedUserModel, result);
            
            // A.CallTo(() => userRepository.UpdateItem(A<User>._, A<Expression<Func<User, object>>>._, A<Expression<Func<User, object>>>._))
            //    .Returns(userEntity);
        }
        
        // todo: refactor tests later
        [Fact]
        public async Task ShouldRemoveUserAsync()
        {
            //Arrange
            var unitOfWork = A.Fake<IUnitOfWork>();
            var cacheContext = A.Fake<ICacheContext>();
            var appSettings = new AppSettings();
            
            var userService = new UserService(unitOfWork, cacheContext, appSettings);

            var userId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");

            // A.CallTo(() => userRepository.Remove(A<Expression<Func<User, bool>>>._)).DoesNothing();
            // A.CallTo(() => refreshTokenRepository.Remove(A<Expression<Func<RefreshToken, bool>>>._)).DoesNothing();
            
            //Act
            await userService.RemoveAsync(userId);

            //Assert
            //A.CallTo(() => userRepository.Remove(A<Expression<Func<User, bool>>>._))
            //    .MustHaveHappened();
            // A.CallTo(() => refreshTokenRepository.Remove(A<Expression<Func<RefreshToken, bool>>>._))
            //    .MustHaveHappened();
        }

        // todo: refactor tests later
        [Fact]
        public async Task ShouldUpdateUserPasswordAsync()
        {
            //Arrange
            var unitOfWork = A.Fake<IUnitOfWork>();
            var cacheContext = A.Fake<ICacheContext>();
            var appSettings = new AppSettings();
            
            var userService = new UserService(unitOfWork, cacheContext, appSettings);

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

            // A.CallTo(() => userRepository.SearchForSingleItemAsync(A<Expression<Func<User, bool>>>._))
            //    .Returns(userEntity);
            // A.CallTo(() => userRepository.UpdateUserPasswordAsync(A<User>._))
            //    .DoesNothing();
            
            //Act
            await userService.UpdatePasswordAsync(userId, passwordUpdate);

            //Assert
            // A.CallTo(() => userRepository.SearchForSingleItemAsync(A<Expression<Func<User, bool>>>._))
            //    .MustHaveHappened();
            // A.CallTo(() => userRepository.UpdateUserPasswordAsync(A<User>._))
            //    .MustHaveHappened();
        }

        // todo: refactor tests later
        [Fact]
        public async Task ShouldThrowErrorOnUpdateUserPasswordAsync()
        {
            //Arrange
            var unitOfWork = A.Fake<IUnitOfWork>();
            var cacheContext = A.Fake<ICacheContext>();
            var appSettings = new AppSettings();
            
            var userService = new UserService(unitOfWork, cacheContext, appSettings);

            var userId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var passwordUpdate = new PasswordUpdateRequestModel
            {
                OldPassword = "123",
                NewPassword = "312"
            };

            // A.CallTo(() => userRepository.SearchForSingleItemAsync(A<Expression<Func<User, bool>>>._))
            //    .Returns((User)null);

            //Act && Assert
            await Assert.ThrowsAsync<UserFriendlyException>(async () => await userService.UpdatePasswordAsync(userId, passwordUpdate));

            //  A.CallTo(() => userRepository.SearchForSingleItemAsync(A<Expression<Func<User, bool>>>._))
            // .MustHaveHappened();
            // A.CallTo(() => userRepository.UpdateUserPasswordAsync(A<User>._))
            // .MustNotHaveHappened();
        }

        // todo: refactor tests later
        [Fact]
        public async Task ShouldUpdateUserAvatarAsync()
        {
            //Arrange
            var unitOfWork = A.Fake<IUnitOfWork>();
            var cacheContext = A.Fake<ICacheContext>();
            var appSettings = new AppSettings();
            
            var userService = new UserService(unitOfWork, cacheContext, appSettings);
            
            var user = new Models.Models.Models.User
            {
                UserId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec"),
                AvatarLink = "link"
            };
            
            // A.CallTo(() => userRepository.UpdateUserAvatarLinkAsync(A<User>._))
            //     .DoesNothing();

            //Act
            await userService.UpdateAvatarAsync(user);

            //Assert
            // A.CallTo(() => userRepository.UpdateUserAvatarLinkAsync(A<User>._))
            //     .MustHaveHappened();
        }

        // todo: refactor tests later
        [Fact]
        public async Task ShouldChangeUserActivityStatusAsync()
        {
            //Arrange
            var unitOfWork = A.Fake<IUnitOfWork>();
            var cacheContext = A.Fake<ICacheContext>();
            var appSettings = new AppSettings();
            
            var userService = new UserService(unitOfWork, cacheContext, appSettings);
            
            var user = new Models.Models.Models.User
            {
                UserId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec"),
                AvatarLink = "link"
            };
            
            // A.CallTo(() => userRepository.ChangeUserActivityStatusAsync(A<User>._))
            //    .DoesNothing();

            //Act
            await userService.ChangeActivityStatusAsync(user);

            //Assert
            // A.CallTo(() => userRepository.ChangeUserActivityStatusAsync(A<User>._))
            //    .MustHaveHappened();
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