using System;

namespace WebAPI.Models.Models
{
    public class Team
    {
        public Guid TeamId { get; set; }
        
        public Guid? ProjectId { get; set; }
        
        public string TeamName { get; set; }
        
        public string Location { get; set; }

        public Guid CustomerId { get; set; }
        
        public virtual int MembersCount { get; set; }
    }
}