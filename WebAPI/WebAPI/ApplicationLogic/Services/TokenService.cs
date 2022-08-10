using System;
using System.Threading.Tasks;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Configuration;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Basic;
using WebAPI.Presentation.Constants;
using WebAPI.Presentation.Models.Response;

using RefreshTokenEntity = WebAPI.Core.Entities.RefreshToken;

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
            var newRefreshToken = string.Empty;
            
            if (_appSettings.Token.EnableRefreshTokenVerification)
            {
                newRefreshToken = await UpdateRefreshTokenAsync(userId, refreshToken);
            }
            
            var accessToken = TokenGenerator.GenerateAccessToken(_appSettings, userId, userName, userRole);
            
            var tokenPair = new AuthenticationResponseModel
            {
                AccessToken = new Token(TokenTypes.Access, accessToken),
            };
            
            if (_appSettings.Token.EnableRefreshTokenVerification)
            {
                tokenPair.RefreshToken = new Token(TokenTypes.Refresh, newRefreshToken);
            }

            return tokenPair;
        }

        private async Task<string> UpdateRefreshTokenAsync(Guid userId, string refreshToken)
        {
            var originalRefreshTokenEntity = await GetOriginalRefreshToken(userId, refreshToken);
                
            var newRefreshTokenEntity = TokenGenerator.GenerateRefreshTokenEntity(
                userId,
                _appSettings.Token.LifeTime);

            UpdateExistingRefreshTokenRecord(originalRefreshTokenEntity, newRefreshTokenEntity);

            await _unitOfWork.CommitAsync();

            return originalRefreshTokenEntity.Value;
        }

        private async Task<RefreshTokenEntity> GetOriginalRefreshToken(Guid userId, string refreshToken)
        {
            var originalRefreshTokenEntity = await _unitOfWork.RefreshTokenRepository
                .SearchForSingleItemAsync(
                    token => token.UserId == userId && token.Value == refreshToken,
                    includeTracking: false);

            if (originalRefreshTokenEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND,
                    ExceptionMessageGenerator.GetMissingEntityMessage($"refresh token and {nameof(userId)}")
                );
            }

            return originalRefreshTokenEntity;
        }

        private void UpdateExistingRefreshTokenRecord(
            RefreshTokenEntity originalRefreshToken, 
            RefreshTokenEntity newRefreshToken)
        {
            originalRefreshToken.Value = newRefreshToken.Value;
            originalRefreshToken.ExpirationDate = newRefreshToken.ExpirationDate;
            
            _unitOfWork.RefreshTokenRepository.UpdateItem(originalRefreshToken, prop => prop.Value);
        }
    }
}