using System;

namespace WebAPI.Models.Models
{
    public class Project
    {
        public Guid ProjectId { get; set; }
        
        public string ProjectName { get; set; }
        
        public string ProjectDescription { get; set; }
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
        
        public DateTime CreationDate { get; set; }
        
        public Guid WorkSpaceId { get; set; }
    }
}