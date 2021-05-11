using System;
using WebAPI.Core.Configuration;

namespace WebAPI.Core.Interfaces.Utilities
{
    public interface ITokenGenerator
    {
        string GenerateAccessToken(AppSettings appSettings, Guid userId, string userName, string userRole);

        string GenerateRefreshToken();
    }
}