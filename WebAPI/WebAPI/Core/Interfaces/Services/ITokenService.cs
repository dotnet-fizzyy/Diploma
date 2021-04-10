using System;
using System.Threading.Tasks;
using WebAPI.Models.Models.Authentication;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface ITokenService
    {
        Task<AuthenticationResponse> AuthenticateUser(SignInUser user);

        Task<Core.Entities.User> GetRefreshTokenByUserId(string refreshToken, Guid userId);
    }
}