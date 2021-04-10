using System;

namespace WebAPI.Models.Models.Simple
{
    public class UserSimpleModel
    {
        public Guid UserId { get; set; }
        
        public string UserName { get; set; }
        
        public string AvatarLink { get; set; }
    }
}