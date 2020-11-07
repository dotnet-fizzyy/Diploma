using System;
using System.Collections.Generic;

namespace WebAPI.Core.Entities
{
    public class Epic
    {
        public Epic()
        {
            Sprints = new List<Sprint>();    
            TeamEpics = new List<TeamEpic>();
        }
        
        public Guid EpicId { get; set; }
        
        public Guid ProjectId { get; set; }
        
        public string EpicName { get; set; }
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
        
        public string EpicDescription { get; set; }
        
        public double Progress { get; set; }
        
        public IList<TeamEpic> TeamEpics { get; set; }
        
        public IList<Sprint> Sprints { get; set; }
    }
}