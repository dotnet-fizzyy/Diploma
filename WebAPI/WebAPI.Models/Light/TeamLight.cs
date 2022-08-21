using System;

namespace WebAPI.Models.Light
{
    public class TeamLight
    {
        public Guid TeamId { get; set; }
        
        public string TeamName { get; set; }
        
        public Guid ProjectId { get; set; }
        
        public string Location { get; set; }
    }
}