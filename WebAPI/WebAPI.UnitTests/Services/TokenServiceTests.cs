using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using FakeItEasy;
using WebAPI.ApplicationLogic.Services;
using WebAPI.Core.Configuration;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Models.Enums;
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
        public async Task ShouldGenerateNewUserTokensPair()
        {
            //Arrange
            var unitOfWork = A.Fake<IUnitOfWork>();
            var userProvider = A.Fake<ICacheContext>();
            var refreshTokenRepository = A.Fake<IRefreshTokenRepository>();

            var tokenService = new TokenService(unitOfWork, userProvider, _appSettings);
            
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