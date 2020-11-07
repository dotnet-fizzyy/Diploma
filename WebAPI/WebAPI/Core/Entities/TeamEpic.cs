using System;

namespace WebAPI.Core.Entities
{
    public class TeamEpic
    {
        public Guid TeamEpicId { get; set; }
        
        public Guid TeamId { get; set; }
        
        public Guid EpicId { get; set; }
    }
}