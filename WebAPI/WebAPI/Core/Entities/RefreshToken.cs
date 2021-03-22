using System;

namespace WebAPI.Core.Entities
{
    public class RefreshToken : BaseEntity
    {
        public Guid UserId { get; set; }
        
        public string Value { get; set; }
        
        public DateTime ExpirationDate { get; set; }
    }
}