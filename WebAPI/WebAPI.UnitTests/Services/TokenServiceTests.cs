using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using FakeItEasy;
using WebAPI.ApplicationLogic.Services;
using WebAPI.Core.Configuration;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Providers;
using WebAPI.Models.Enums;
using WebAPI.Models.Models.Result;
using WebAPI.Presentation.Models.Request;
using Xunit;

namespace WebAPI.UnitTests.Services
{
    public class TokenServiceTests
    {
        private readonly AppSettings _appSettings = new AppSettings
        {
            Token = new TokenSettings
            {
                Audience = "diploma-audience", 
                Issuer = "diploma-api", 
                LifeTime = 10, 
                SigningKey = "ihopethiskeyislongenough", 
                EnableRefreshTokenVerification = true
            }
        };

        [Fact]
        public async Task ShouldAuthenticateUserAndReturnTokensPair()
        {
            //Arrange
            var userProvider = A.Fake<IUserProvider>();
            var refreshTokenRepository = A.Fake<IRefreshTokenRepository>();

            var tokenService = new TokenService(userProvider, refreshTokenRepository, _appSettings);

            var userId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            const string userName = "UserName";
            
            var signInUser = new SignInUserRequestModel
            {
                Email = userName,
                Password = "123",
            };

            var userEntity = new FullUser
            {
                UserId = userId,
                UserName = userName,
                UserRole = UserRole.Engineer,
            };

            var refreshTokenEntity = new Core.Entities.RefreshToken
            {
                UserId = userId,
                Value = "new value"
            };
            
            A.CallTo(() => userProvider.GetFullUser(A<SignInUserRequestModel>._))
                .Returns(userEntity);

            A.CallTo(() => refreshTokenRepository.CreateAsync(A<Core.Entities.RefreshToken>._))
                .Returns(refreshTokenEntity);

            //Act
            var result = await tokenService.AuthenticateUser(signInUser);

            //Assert
            Assert.NotNull(result.User);
            Assert.NotNull(result.AccessToken.Value);
            Assert.NotNull(result.RefreshToken.Value);
            
            A.CallTo(() => userProvider.GetFullUser(A<SignInUserRequestModel>._))
                .MustHaveHappenedOnceExactly();
            A.CallTo(() => refreshTokenRepository.CreateAsync(A<Core.Entities.RefreshToken>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldAuthenticateUserAndReturnOnlyAccessTokens()
        {
            //Arrange
            _appSettings.Token.EnableRefreshTokenVerification = false;
            
            var userProvider = A.Fake<IUserProvider>();
            var refreshTokenRepository = A.Fake<IRefreshTokenRepository>();

            var tokenService = new TokenService(userProvider, refreshTokenRepository, _appSettings);

            var userId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            const string userName = "UserName";
            
            var signInUser = new SignInUserRequestModel
            {
                Email = userName,
                Password = "123",
            };

            var userEntity = new FullUser
            {
                UserId = userId,
                UserName = userName,
                UserRole = UserRole.Engineer,
            };

            A.CallTo(() => userProvider.GetFullUser(A<SignInUserRequestModel>._))
                .Returns(userEntity);

            //Act
            var result = await tokenService.AuthenticateUser(signInUser);

            //Assert
            Assert.NotNull(result.User);
            Assert.NotNull(result.AccessToken.Value);
            Assert.Null(result.RefreshToken.Value);
            
            A.CallTo(() => userProvider.GetFullUser(A<SignInUserRequestModel>._))
                .MustHaveHappenedOnceExactly();
            A.CallTo(() => refreshTokenRepository.CreateAsync(A<Core.Entities.RefreshToken>._))
                .MustNotHaveHappened();
        }
        
        [Fact]
        public async Task ShouldGenerateNewUserTokensPair()
        {
            //Arrange
            var userProvider = A.Fake<IUserProvider>();
            var refreshTokenRepository = A.Fake<IRefreshTokenRepository>();

            var tokenService = new TokenService(userProvider, refreshTokenRepository, _appSettings);
            
            var userId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var userRole = UserRole.Engineer.ToString();
            const string userName = "UserName";
            
            var entity = new Core.Entities.RefreshToken
            {
                UserId = userId,
                Value = "token_value",
            };

            A.CallTo(() => refreshTokenRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.RefreshToken, bool>>>._))
                .Returns(entity);

            //Act
            var result = await tokenService.UpdateTokens("token", userId, userName, userRole);

            //Assert
            Assert.NotNull(result.AccessToken.Value);
            Assert.NotNull(result.RefreshToken.Value);
            
            A.CallTo(() =>refreshTokenRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.RefreshToken, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }
    }
}