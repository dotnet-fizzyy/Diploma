using System;

namespace WebAPI.Models.Models.Simple
{
    public class TeamSimpleModel
    {
        public Guid TeamId { get; set; }
        
        public string TeamName { get; set; }
        
        public Guid ProjectId { get; set; }
    }
}