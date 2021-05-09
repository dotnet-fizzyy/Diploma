using System;
using System.Linq;
using System.Security.Claims;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Utilities;
using WebAPI.Core.Models;

namespace WebAPI.ApplicationLogic.Utilities
{
    public class ClaimsReader : IClaimsReader
    {
        public UserClaims GetUserClaims(ClaimsPrincipal user)
        {
            var userId = user.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            var userRole = user.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value;
            var userName = user.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;

            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(userRole) || string.IsNullOrEmpty(userName))
            {
                throw new UserFriendlyException(ErrorStatus.INVALID_DATA, "Missing user id or role");
            }

            var userClaims = new UserClaims(Guid.Parse(userId), userName, (WebAPI.Models.Enums.UserRole)Enum.Parse(typeof(WebAPI.Models.Enums.UserRole), userRole));
            
            return userClaims;
        }
    }
}