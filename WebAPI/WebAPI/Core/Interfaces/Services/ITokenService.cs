using System;
using System.Threading.Tasks;
using WebAPI.Models.Models.Result;
using WebAPI.Presentation.Models;
using WebAPI.Presentation.Models.Request;
using WebAPI.Presentation.Models.Response;

namespace WebAPI.Core.Interfaces.Services
{
    public interface ITokenService
    {
        Task<AuthenticationUserResponseModel> AuthenticateUser(SignInUserRequestModel userRequestModel);

        Task<AuthenticationResponseModel> UpdateTokens(string refreshToken, Guid userId, string userName, string userRole);
    }
}