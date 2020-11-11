using System.Threading.Tasks;
using WebAPI.Core.Entities;
using WebAPI.Models.Models;
using WebAPI.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface ITokenService
    {
        Task<TokenPair> AuthenticateUser(AuthenticationUser user);
    }
}