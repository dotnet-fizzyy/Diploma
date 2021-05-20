using System;
using WebAPI.Models.Enums;

namespace WebAPI.Models.Models.Simple
{
    public class UserSimpleModel
    {
        public Guid UserId { get; set; }
        
        public string UserName { get; set; }
        
        public UserRole UserRole { get; set; }
        
        public UserPosition UserPosition { get; set; }
    }
}