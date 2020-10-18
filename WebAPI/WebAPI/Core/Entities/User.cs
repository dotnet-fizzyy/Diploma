using System;
using WebAPI.Core.Enums;

namespace WebAPI.Core.Entities
{
    public class User
    {
        public Guid UserId { get; set; }
        
        public string UserName { get; set; }
        
        public UserRole UserRole { get; set; }
        
        public UserPosition UserPosition { get; set; }
        
        public bool IsActive { get; set; }
        
        public string Email { get; set; }
        
        public string AvatarLink { get; set; }
        
        public uint RecordVersion { get; set; }
    }
}