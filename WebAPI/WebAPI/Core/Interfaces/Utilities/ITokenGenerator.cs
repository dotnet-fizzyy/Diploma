using System;
using WebAPI.Core.Configuration;
using WebAPI.Models.Models;

namespace WebAPI.Core.Interfaces.Utilities
{
    public interface ITokenGenerator
    {
        string GenerateAccessToken(AppSettings appSettings, Guid userId, string userRole);

        string GenerateRefreshToken();

        bool ValidateExpirationTime(string token);
    }
}