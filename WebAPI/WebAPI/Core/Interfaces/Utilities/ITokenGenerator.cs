using WebAPI.Core.Configuration;
using WebAPI.Core.Entities;

namespace WebAPI.Core.Interfaces.Utilities
{
    public interface ITokenGenerator
    {
        string GenerateAccessToken(AppSettings appSettings, User user);

        string GenerateRefreshToken();

        bool ValidateExpirationTime(string token);
    }
}