using System;
using System.Linq;
using System.Security.Claims;
using WebAPI.Core.Exceptions;
using WebAPI.Presentation.Models.Response;
using CoreErrorStatus = WebAPI.Core.Enums.ErrorStatus;
using ModelUserRole = WebAPI.Models.Enums.UserRole;

namespace WebAPI.Presentation.Utilities
{
    public static class ClaimsReader
    {
        public static UserClaimsResponseModel GetUserClaims(ClaimsPrincipal user)
        {
            var userId = user.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            var userRole = user.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value;
            var userName = user.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;

            var isAnyRequiredClaimMissing = string.IsNullOrEmpty(userId) || 
                                            string.IsNullOrEmpty(userRole) ||
                                            string.IsNullOrEmpty(userName);
            
            if (isAnyRequiredClaimMissing)
            {
                throw new UserFriendlyException(CoreErrorStatus.INVALID_DATA, "Missing user id or role");
            }

            return new UserClaimsResponseModel(
                Guid.Parse(userId),
                userName,
                (ModelUserRole)Enum.Parse(typeof(ModelUserRole), userRole)
            );
        }
    }
}