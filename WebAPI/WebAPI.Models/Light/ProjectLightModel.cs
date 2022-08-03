using System;

namespace WebAPI.Models.Light
{
    public class ProjectLightModel
    {
        public Guid ProjectId { get; set; }
        
        public string ProjectName { get; set; }
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
    }
}