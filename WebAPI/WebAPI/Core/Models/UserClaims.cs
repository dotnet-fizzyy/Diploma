using System;
using WebAPI.Core.Enums;

namespace WebAPI.Core.Models
{
    public class UserClaims
    {
        public UserClaims() {}

        public UserClaims(Guid userId, UserRole userRole)
        {
            UserId = userId;
            UserRole = userRole;
        }
        
        public Guid UserId { get; }
        
        public UserRole UserRole { get; }
    }
}