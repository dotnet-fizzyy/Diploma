using System;
using WebAPI.Models.Enums;

namespace WebAPI.Core.Models
{
    public class UserClaims
    {
        public UserClaims(Guid userId, string userName, UserRole userRole)
        {
            UserId = userId;
            UserRole = userRole;
            UserName = userName;
        }
        
        public Guid UserId { get; }
        
        public UserRole UserRole { get; }
        
        public string UserName { get; }
    }
}