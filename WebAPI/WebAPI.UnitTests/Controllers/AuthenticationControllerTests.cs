using System;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using FakeItEasy;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Enums;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;
using WebAPI.Presentation.Constants;
using WebAPI.Presentation.Controllers;
using WebAPI.Presentation.Models.Request;
using WebAPI.Presentation.Models.Response;
using Xunit;

namespace WebAPI.UnitTests.Controllers
{
    public class AuthenticationControllerTests
    {
        [Fact]
        public async Task ShouldSignInUser()
        {
            //Arrange
            var tokenService = A.Fake<ITokenService>();
            var userService = A.Fake<IUserService>();
            
            var body = new SignInUserRequestModel
            {
                Email = "test@mail.com",
                Password = "123",
            };

            var createdUser = new AuthenticationUserResponseModel
            {
                User = new FullUser
                {
                    UserName = "userName",
                    Email = body.Email,
                    UserPosition = UserPosition.Customer,
                    UserRole = UserRole.Manager
                },
                AccessToken = new Token(),
                RefreshToken = new Token()
            };

            var authController = new AuthenticationController(tokenService, userService);

            A.CallTo(() => tokenService.AuthenticateUser(A<SignInUserRequestModel>._))
                .Returns(createdUser);
            
            //Act
            var result = await authController.AuthenticateUser(body);
            
            //Assert
            Assert.NotNull(result);
            Assert.NotNull(result.Value.User);
            Assert.NotNull(result.Value.AccessToken);
            Assert.NotNull(result.Value.RefreshToken);
        }
        
        [Fact]
        public async Task ShouldCreateCustomer()
        {
            //Arrange
            var tokenService = A.Fake<ITokenService>();
            var userService = A.Fake<IUserService>();
            
            var body = new SignUpUserRequestModel
            {
                Email = "test@mail.com",
                Password = "123",
                UserName = "user"
            };

            var createdUser = new User
            {
                UserName = body.UserName,
                Email = body.Email,
                UserPosition = UserPosition.Customer,
                UserRole = UserRole.Manager
            };

            var authController = new AuthenticationController(tokenService, userService);

            A.CallTo(() => userService.CreateCustomerAsync(A<SignUpUserRequestModel>._))
                .Returns(createdUser);
            
            //Act
            var result = await authController.CreateCustomer(body);
            
            //Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            Assert.True(createdAtActionResult.StatusCode.HasValue);
            Assert.Equal(HttpStatusCode.Created, (HttpStatusCode)createdAtActionResult.StatusCode);
            Assert.Equal(body.UserName, ((User)createdAtActionResult.Value).UserName);
            Assert.Equal(body.Email, ((User)createdAtActionResult.Value).Email);
            Assert.Equal(UserRole.Manager, ((User)createdAtActionResult.Value).UserRole);
            Assert.Equal(UserPosition.Customer, ((User)createdAtActionResult.Value).UserPosition);
        }

        [Fact]
        public async Task ShouldUpdateUserTokens()
        {
            //Arrange
            var tokenService = A.Fake<ITokenService>();
            var userService = A.Fake<IUserService>();

            var userId = new Guid("5593238f-87e6-4e86-93fc-ab79b8804444");
            const string userName = "user";
            const string refreshToken = "refreshToken";
            const UserRole userRole = UserRole.Manager;
            
            var user = new ClaimsPrincipal(new ClaimsIdentity(new []
            {
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(ClaimTypes.Role, userRole.ToString()),
                new Claim(ClaimTypes.Name, userName),
            }));

            var authModel = new AuthenticationResponseModel
            {
                AccessToken = new Token(TokenTypes.Access, "acc_token"),
                RefreshToken = new Token(TokenTypes.Refresh, "ref_token")
            };
            
            var httpContextAccessor = new HttpContextAccessor
            {
                HttpContext = new DefaultHttpContext
                {
                    User = user
                }
            };
            
            var authController = new AuthenticationController(tokenService, userService)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = httpContextAccessor.HttpContext
                }
            };

            A.CallTo(() => tokenService.UpdateTokens(refreshToken, userId, userName, A<string>._))
                .Returns(authModel);
            
            //Act
            var result = await authController.UpdateAccessToken(refreshToken);

            //Assert
            Assert.NotNull(result.Value);
            Assert.NotNull(result.Value.AccessToken);
            Assert.NotNull(result.Value.RefreshToken);
        }
        
        [Fact]
        public async Task ShouldCheckForEmailExistence()
        {
            //Arrange
            var tokenService = A.Fake<ITokenService>();
            var userService = A.Fake<IUserService>();
   
            const string email = "test@mail.com";

            var emailResultModel = new EmailResponseModel
            {
                IsEmailExist = true,
            };
            

            var authController = new AuthenticationController(tokenService, userService);

            A.CallTo(() => userService.CheckForEmailExistenceAsync(A<string>._))
                .Returns(emailResultModel);
            
            //Act
            var result = await authController.CheckForEmailExistence(email);

            //Assert
            Assert.NotNull(result.Value);
            Assert.Equal(emailResultModel.IsEmailExist, result.Value.IsEmailExist);
        }
    }
}