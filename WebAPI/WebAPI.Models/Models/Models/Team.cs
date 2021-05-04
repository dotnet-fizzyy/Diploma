using System;

namespace WebAPI.Models.Models.Models
{
    public class Team
    {
        public Guid TeamId { get; set; }
        
        public Guid ProjectId { get; set; }
        
        public string TeamName { get; set; }
        
        public string Location { get; set; }

        public DateTime CreationDate { get; set; }
        
        public virtual int MembersCount { get; set; }
    }
}