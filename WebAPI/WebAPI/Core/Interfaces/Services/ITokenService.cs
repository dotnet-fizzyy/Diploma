using System;
using System.Threading.Tasks;
using WebAPI.Presentation.Models.Response;

namespace WebAPI.Core.Interfaces.Services
{
    public interface ITokenService
    {
        Task<AuthenticationResponseModel> UpdateTokens(
            string refreshToken, 
            Guid userId, 
            string userName,
            string userRole);
    }
}