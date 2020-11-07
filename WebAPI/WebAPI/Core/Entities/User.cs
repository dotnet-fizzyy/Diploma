using System;
using System.Collections.Generic;
using WebAPI.Core.Enums;

namespace WebAPI.Core.Entities
{
    public class User
    {
        public User()
        {
            RefreshTokens = new List<RefreshToken>();
            Stories = new List<Story>();
        }
        
        public Guid UserId { get; set; }
        
        public Guid TeamId { get; set; }
        
        public string UserName { get; set; }
        
        public string Password { get; set; }
        
        public UserRole UserRole { get; set; }
        
        public UserPosition UserPosition { get; set; }
        
        public bool IsActive { get; set; }
        
        public string Email { get; set; }
        
        public string AvatarLink { get; set; }
        
        public uint RecordVersion { get; set; }

        public IList<RefreshToken> RefreshTokens { get; set; }
        
        public IList<Story> Stories { get; set; }
        
    }
}