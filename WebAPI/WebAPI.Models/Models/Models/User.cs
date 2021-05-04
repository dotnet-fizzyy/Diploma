using System;
using WebAPI.Models.Enums;

namespace WebAPI.Models.Models.Models
{
    public class User
    {
        public Guid UserId { get; set; }
        
        public DateTime CreationDate { get; set; }
        
        public Guid? WorkSpaceId { get; set; }
        
        public string UserName { get; set; }
        
        public string Password { get; set; }
        
        public UserRole UserRole { get; set; }
        
        public UserPosition UserPosition { get; set; }
        
        public bool IsActive { get; set; }
        
        public string Email { get; set; }
        
        public string AvatarLink { get; set; }
    }
}