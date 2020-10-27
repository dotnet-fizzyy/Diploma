using System;

namespace WebAPI.Models.Models
{
    public class Team
    {
        public Guid TeamId { get; set; }
        
        public string TeamName { get; set; }
        
        public string Location { get; set; }

        public int MembersCount { get; set; }
    }
}