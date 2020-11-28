using WebAPI.Core.Configuration;
using WebAPI.Core.Entities;

namespace WebAPI.Core.Interfaces.Services
{
    public interface ITokenGenerator
    {
        string GenerateAccessToken(AppSettings appSettings, User user);

        string GenerateRefreshToken();
    }
}