using System;

namespace WebAPI.Models.Light
{
    public class ProjectLight
    {
        public Guid ProjectId { get; set; }
        
        public string ProjectName { get; set; }
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
    }
}