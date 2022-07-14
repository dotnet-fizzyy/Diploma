using System;
using WebAPI.Models.Enums;

namespace WebAPI.Presentation.Models.Response
{
    public class UserClaimsResponseModel
    {
        public UserClaimsResponseModel(Guid userId, string userName, UserRole userRole)
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