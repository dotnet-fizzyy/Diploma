using System.Threading.Tasks;
using WebAPI.Core.Configuration;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models;
using WebAPI.Models.Result;
using WebAPI.Presentation.Constants;

namespace WebAPI.ApplicationLogic.Services
{
    public class TokenService : ITokenService
    {
        private readonly IUserMapper _userMapper;
        private readonly IUserRepository _userRepository;
        private readonly AppSettings _appSettings;

        public TokenService(
            IUserMapper userMapper, 
            IUserRepository userRepository, 
            AppSettings appSettings
            )
        {
            _userMapper = userMapper;
            _userRepository = userRepository;
            _appSettings = appSettings;
        }
        

        public async Task<TokenPair> AuthenticateUser(AuthenticationUser user)
        {
            var userEntity = _userMapper.MapToEntity(user);

            var authUser = await _userRepository.AuthenticateUser(userEntity);

            if (authUser == null)
            {
                return null;
            }

            var token = new TokenGenerator().GenerateAccessToken(_appSettings, authUser);

            var tokenPair = new TokenPair
            {
                AccessToken = new Token(TokenTypes.Access, token),
            };

            return tokenPair;
        }
    }
}