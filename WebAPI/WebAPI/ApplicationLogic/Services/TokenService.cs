using System;
using System.Threading.Tasks;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Configuration;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Aggregators;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Providers;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Core.Interfaces.Utilities;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;
using WebAPI.Presentation.Constants;
using WebAPI.Presentation.Models;
using WebAPI.Presentation.Models.Action;
using WebAPI.Presentation.Models.Result;

namespace WebAPI.ApplicationLogic.Services
{
    public class TokenService : ITokenService
    {
        private readonly IUserProvider _userProvider;
        private readonly ITokenGenerator _tokenGenerator;
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        private readonly IRefreshTokenAggregator _refreshTokenAggregator;
        private readonly AppSettings _appSettings;

        public TokenService(
            IUserProvider userProvider,
            ITokenGenerator tokenGenerator,
            IRefreshTokenRepository refreshTokenRepository,
            IRefreshTokenAggregator refreshTokenAggregator,
            AppSettings appSettings
            )
        {
            _userProvider = userProvider;
            _appSettings = appSettings;
            _refreshTokenRepository = refreshTokenRepository;
            _tokenGenerator = tokenGenerator;
            _refreshTokenAggregator = refreshTokenAggregator;
        }
        

        public async Task<AuthenticationUserResultModel> AuthenticateUser(SignInUser user)
        {
            //Authenticate user (find in db)
            var fullUserModel = await _userProvider.GetFullUser(user);

            //Generate tokens if record is valid
            var accessToken = _tokenGenerator.GenerateAccessToken(_appSettings, fullUserModel.UserId, fullUserModel.UserName, fullUserModel.UserRole.ToString());

            string refreshToken = null;
            if (_appSettings.Token.EnableRefreshTokenVerification)
            {
                refreshToken = _tokenGenerator.GenerateRefreshToken();
                var refreshTokenEntity = _refreshTokenAggregator.GenerateRefreshTokenEntityOnSave(fullUserModel.UserId, refreshToken, _appSettings.Token.LifeTime);
               
                await _refreshTokenRepository.CreateAsync(refreshTokenEntity);
            }

            var tokenPair = new AuthenticationUserResultModel
            {
                AccessToken = new Token(TokenTypes.Access, accessToken),
                RefreshToken = new Token(TokenTypes.Refresh, refreshToken),
                User = fullUserModel
            };

            return tokenPair;
        }

        public async Task<AuthenticationResultModel> UpdateTokens(string refreshToken, Guid userId, string userName, string userRole)
        {
            var accessToken = _tokenGenerator.GenerateAccessToken(_appSettings, userId, userName, userRole);

            Core.Entities.RefreshToken updatedRefreshToken = null;
            if (_appSettings.Token.EnableRefreshTokenVerification)
            {
                var refreshTokenEntity = await _refreshTokenRepository.SearchForSingleItemAsync(x => x.UserId == userId && x.Value == refreshToken && x.ExpirationDate > DateTime.UtcNow);
                if (refreshTokenEntity == null)
                {
                    throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntityMessage($"refresh token and {nameof(userId)}"));
                }
                
                refreshTokenEntity.Value = _tokenGenerator.GenerateRefreshToken();
                
                updatedRefreshToken = await _refreshTokenRepository.UpdateItemAsync(refreshTokenEntity);
            }
            
            var tokenPair = new AuthenticationResultModel
            {
                AccessToken = new Token(TokenTypes.Access, accessToken),
                RefreshToken = new Token(TokenTypes.Refresh, updatedRefreshToken?.Value)
            };

            return tokenPair;
        }
    }
}