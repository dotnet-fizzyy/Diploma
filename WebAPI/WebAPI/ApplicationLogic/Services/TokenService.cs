using System;
using System.Threading.Tasks;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Configuration;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Providers;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models.Models;
using WebAPI.Presentation.Constants;
using WebAPI.Presentation.Models.Request;
using WebAPI.Presentation.Models.Response;

using RefreshTokenEntity = WebAPI.Core.Entities.RefreshToken;

namespace WebAPI.ApplicationLogic.Services
{
    public class TokenService : ITokenService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserProvider _userProvider;
        private readonly AppSettings _appSettings;

        public TokenService(
            IUnitOfWork unitOfWork,
            IUserProvider userProvider,
            AppSettings appSettings)
        {
            _unitOfWork = unitOfWork;
            _userProvider = userProvider;
            _appSettings = appSettings;
        }
        

        public async Task<AuthenticationUserResponseModel> AuthenticateUser(SignInUserRequestModel userRequestModel)
        {
            //Authenticate user (find in db)
            var fullUserModel = await _userProvider.AuthenticateAndGetFullUser(userRequestModel);

            //Generate tokens if record is valid
            var accessToken = TokenGenerator.GenerateAccessToken(
                _appSettings, 
                fullUserModel.UserId, 
                fullUserModel.UserName, 
                fullUserModel.UserRole.ToString());

            string refreshToken = null;

            if (_appSettings.Token.EnableRefreshTokenVerification)
            {
                var existingToken = await _unitOfWork.RefreshTokenRepository
                    .SearchForSingleItemAsync(token => token.UserId == fullUserModel.UserId);
 
                if (existingToken != null)
                {
                    refreshToken = existingToken.Value;
                }
                else
                {
                    refreshToken = TokenGenerator.GenerateRefreshToken();
                    var refreshTokenEntity = GenerateRefreshTokenEntityOnSave(
                        fullUserModel.UserId,
                        refreshToken,
                        _appSettings.Token.LifeTime);
               
                    await _unitOfWork.RefreshTokenRepository.CreateAsync(refreshTokenEntity);

                    await _unitOfWork.CommitAsync();
                }
            }

            var tokenPair = new AuthenticationUserResponseModel
            {
                AccessToken = new Token(TokenTypes.Access, accessToken),
                RefreshToken = new Token(TokenTypes.Refresh, refreshToken),
                User = fullUserModel
            };

            return tokenPair;
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
                    .SearchForSingleItemAsync(token => 
                        token.UserId == userId && 
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
        
        private static RefreshTokenEntity GenerateRefreshTokenEntityOnSave(
            Guid userId,
            string token,
            double tokenLifeTime
            ) =>
                new RefreshTokenEntity
                {
                    UserId = userId,
                    Value = token,
                    ExpirationDate = DateTime.UtcNow.Add(TimeSpan.FromMinutes(tokenLifeTime)),
                    CreationDate = DateTime.UtcNow
                };
    }
}