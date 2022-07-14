using System;
using System.Threading.Tasks;
using WebAPI.Models.Models.Result;
using WebAPI.Presentation.Models;
using WebAPI.Presentation.Models.Action;
using WebAPI.Presentation.Models.Response;

namespace WebAPI.Core.Interfaces.Services
{
    public interface ITokenService
    {
        Task<AuthenticationUserResponseModel> AuthenticateUser(SignInUser user);

        Task<AuthenticationResponseModel> UpdateTokens(string refreshToken, Guid userId, string userName, string userRole);
    }
}