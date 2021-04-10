using System;
using System.Threading.Tasks;
using WebAPI.Core.Configuration;
using WebAPI.Core.Interfaces.Aggregators;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Providers;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Core.Interfaces.Utilities;
using WebAPI.Models.Models;
using WebAPI.Models.Models.Authentication;
using WebAPI.Models.Models.Result;
using WebAPI.Presentation.Constants;

namespace WebAPI.ApplicationLogic.Services
{
    public class TokenService : ITokenService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserProvider _userProvider;
        private readonly ITokenGenerator _tokenGenerator;
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        private readonly IRefreshTokenAggregator _refreshTokenAggregator;
        private readonly AppSettings _appSettings;

        public TokenService(
            IUserRepository userRepository,
            IUserProvider userProvider,
            ITokenGenerator tokenGenerator,
            IRefreshTokenRepository refreshTokenRepository,
            IRefreshTokenAggregator refreshTokenAggregator,
            AppSettings appSettings
            )
        {
            _userRepository = userRepository;
            _userProvider = userProvider;
            _appSettings = appSettings;
            _refreshTokenRepository = refreshTokenRepository;
            _tokenGenerator = tokenGenerator;
            _refreshTokenAggregator = refreshTokenAggregator;
        }
        

        public async Task<AuthenticationResponse> AuthenticateUser(SignInUser user)
        {
            //Authenticate user (find in db)
            var fullUserModel = await _userProvider.GetFullUser(user);

            //Generate tokens if record is valid
            var accessToken = _tokenGenerator.GenerateAccessToken(_appSettings, fullUserModel.UserId, fullUserModel.UserRole.ToString());

            string refreshToken = null;
            if (_appSettings.Token.EnableRefreshTokenVerification)
            {
                refreshToken = _tokenGenerator.GenerateRefreshToken();

                var refreshTokenEntity =
                    _refreshTokenAggregator.GenerateRefreshTokenEntityOnSave(fullUserModel.UserId, refreshToken);
                refreshTokenEntity.CreationDate = DateTime.UtcNow.ToUniversalTime();
                
                await _refreshTokenRepository.CreateAsync(refreshTokenEntity);
            }

            var tokenPair = new AuthenticationResponse
            {
                AccessToken = new Token(TokenTypes.Access, accessToken),
                RefreshToken = new Token(TokenTypes.Refresh, refreshToken),
                User = fullUserModel
            };

            return tokenPair;
        }

        public async Task<Core.Entities.User> GetRefreshTokenByUserId(string refreshToken, Guid userId)
        {
            var refreshTokenEntity = await _refreshTokenRepository.SearchForSingleItemAsync(
                x => x.UserId == userId && x.Value == refreshToken);

            if (refreshTokenEntity == null)
            {
                return null;
            }

            var userEntity = await _userRepository.SearchForSingleItemAsync(x => x.Id == userId);

            return userEntity;
        }
    }
}