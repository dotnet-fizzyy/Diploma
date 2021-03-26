using System;
using System.Threading.Tasks;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Configuration;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Aggregators;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Core.Interfaces.Utilities;
using WebAPI.Models.Models;
using WebAPI.Models.Models.Authentication;
using WebAPI.Models.Result;
using WebAPI.Presentation.Constants;

namespace WebAPI.ApplicationLogic.Services
{
    public class TokenService : ITokenService
    {
        private readonly IUserMapper _userMapper;
        private readonly IUserRepository _userRepository;
        private readonly ITokenGenerator _tokenGenerator;
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        private readonly IRefreshTokenAggregator _refreshTokenAggregator;
        private readonly AppSettings _appSettings;

        public TokenService(
            IUserMapper userMapper, 
            IUserRepository userRepository, 
            ITokenGenerator tokenGenerator,
            IRefreshTokenRepository refreshTokenRepository,
            IRefreshTokenAggregator refreshTokenAggregator,
            AppSettings appSettings
            )
        {
            _userMapper = userMapper;
            _userRepository = userRepository;
            _appSettings = appSettings;
            _refreshTokenRepository = refreshTokenRepository;
            _tokenGenerator = tokenGenerator;
            _refreshTokenAggregator = refreshTokenAggregator;
        }
        

        public async Task<AuthenticationResponse> AuthenticateUser(SignInUser user)
        {
            //Authenticate user (find in db)
            var userEntity = _userMapper.MapToEntity(user);
            userEntity.Password = PasswordHashing.CreateHashPassword(userEntity.Password);

            var authUser = await _userRepository.AuthenticateUser(userEntity);

            if (authUser == null)
            {
                throw new UserFriendlyException(ErrorStatus.INVALID_DATA, "Unable to authenticate user");
            }

            //Generate tokens if record is valid
            var accessToken = _tokenGenerator.GenerateAccessToken(_appSettings, authUser);

            string refreshToken = null;
            if (_appSettings.Token.EnableRefreshTokenVerification)
            {
                refreshToken = _tokenGenerator.GenerateRefreshToken();

                var refreshTokenEntity =
                    _refreshTokenAggregator.GenerateRefreshTokenEntityOnSave(authUser.Id, refreshToken);
                refreshTokenEntity.CreationDate = DateTime.UtcNow.ToUniversalTime();
                
                await _refreshTokenRepository.CreateAsync(refreshTokenEntity);
            }

            var tokenPair = new AuthenticationResponse
            {
                AccessToken = new Token(TokenTypes.Access, accessToken),
                RefreshToken = new Token(TokenTypes.Refresh, refreshToken),
                User = _userMapper.MapToModel(authUser),
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