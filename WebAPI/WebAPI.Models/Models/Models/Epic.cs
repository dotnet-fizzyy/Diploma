using System;

namespace WebAPI.Models.Models.Models
{
    public class Epic
    {
        public Guid EpicId { get; set; }
        
        public Guid ProjectId { get; set; }
        
        public string EpicName { get; set; }
        
        public string EpicDescription { get; set; }
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
        
        public DateTime CreationDate { get; set; }
        
        public bool IsDeleted { get; set; }
    }
}