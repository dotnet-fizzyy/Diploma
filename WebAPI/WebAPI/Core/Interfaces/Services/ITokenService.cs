using System;
using System.Threading.Tasks;
using WebAPI.Models.Models.Result;
using WebAPI.Presentation.Models;
using WebAPI.Presentation.Models.Action;
using WebAPI.Presentation.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface ITokenService
    {
        Task<AuthenticationUserResultModel> AuthenticateUser(SignInUser user);

        Task<AuthenticationResultModel> UpdateTokens(string refreshToken, Guid userId, string userName, string userRole);
    }
}