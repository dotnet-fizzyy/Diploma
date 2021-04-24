using System;

namespace WebAPI.Core.Entities
{
    public class TeamUser
    {
        public Guid TeamId { get; set; }
        
        public Guid UserId { get; set; }
        
        public Team Team { get; set; }
        
        public User User { get; set; }
    }
}