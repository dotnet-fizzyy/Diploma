using System;
using System.Collections.Generic;
using WebAPI.Core.Enums;

namespace WebAPI.Core.Entities
{
    public class User : BaseEntity
    {
        public Guid? TeamUserId { get; set; }
        
        public Guid? WorkSpaceId { get; set; }
        
        public string UserName { get; set; }
        
        public string Password { get; set; }
        
        public UserRole UserRole { get; set; }
        
        public UserPosition UserPosition { get; set; }
        
        public bool IsActive { get; set; }
        
        public string Email { get; set; }
        
        public string AvatarLink { get; set; }

        public IList<TeamUser> TeamUsers { get; set; } = new List<TeamUser>();

        public IList<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();

        public IList<Story> Stories { get; set; } = new List<Story>();
    }
}