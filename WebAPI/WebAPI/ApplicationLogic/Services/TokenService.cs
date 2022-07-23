using System;
using System.Threading.Tasks;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Configuration;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models.Models;
using WebAPI.Presentation.Constants;
using WebAPI.Presentation.Models.Response;

namespace WebAPI.ApplicationLogic.Services
{
    public class TokenService : ITokenService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly AppSettings _appSettings;

        public TokenService(IUnitOfWork unitOfWork, AppSettings appSettings)
        {
            _unitOfWork = unitOfWork;
            _appSettings = appSettings;
        }

        public async Task<AuthenticationResponseModel> UpdateTokens(
            string refreshToken,
            Guid userId,
            string userName,
            string userRole)
        {
            if (_appSettings.Token.EnableRefreshTokenVerification)
            {
                var refreshTokenEntity = await _unitOfWork.RefreshTokenRepository
                    .SearchForSingleItemAsync(token => token.UserId == userId && 
                                                                token.Value == refreshToken);

                if (refreshTokenEntity == null)
                {
                    throw new UserFriendlyException(
                        ErrorStatus.NOT_FOUND,
                        ExceptionMessageGenerator.GetMissingEntityMessage($"refresh token and {nameof(userId)}")
                    );
                }
            }
            
            var accessToken = TokenGenerator.GenerateAccessToken(_appSettings, userId, userName, userRole);
            
            var tokenPair = new AuthenticationResponseModel
            {
                AccessToken = new Token(TokenTypes.Access, accessToken),
                RefreshToken = new Token(TokenTypes.Refresh, refreshToken)
            };

            return tokenPair;
        }
    }
}