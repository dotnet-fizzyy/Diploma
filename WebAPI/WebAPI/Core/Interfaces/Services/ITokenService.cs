using System;
using System.Threading.Tasks;
using WebAPI.Models.Models;
using WebAPI.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface ITokenService
    {
        Task<AuthenticationResponse> AuthenticateUser(AuthenticationUser user);

        Task<Core.Entities.User> GetRefreshTokenByUserId(string refreshToken, Guid userId);
    }
}