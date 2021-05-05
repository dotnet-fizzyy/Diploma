using System;
using System.Threading.Tasks;
using WebAPI.Models.Models.Authentication;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface ITokenService
    {
        Task<AuthenticationUserResultModel> AuthenticateUser(SignInUser user);

        Task<AuthenticationResultModel> UpdateTokens(string refreshToken, Guid userId, string userName, string userRole);
    }
}