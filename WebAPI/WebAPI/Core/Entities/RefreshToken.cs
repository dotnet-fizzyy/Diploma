using System;

namespace WebAPI.Core.Entities
{
    public class RefreshToken
    {
        public Guid RefreshTokenId { get; set; }
        
        public Guid UserId { get; set; }
        
        public string Value { get; set; }
        
        public bool IsActive { get; set; }
    }
}