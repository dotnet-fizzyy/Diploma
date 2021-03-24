using System.Security.Claims;
using WebAPI.Core.Models;

namespace WebAPI.Core.Interfaces.Utilities
{
    public interface IClaimsReader
    {
        UserClaims GetUserClaims(ClaimsPrincipal user);
    }
}