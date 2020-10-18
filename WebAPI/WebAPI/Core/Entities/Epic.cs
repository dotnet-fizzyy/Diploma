using System;

namespace WebAPI.Core.Entities
{
    public class Epic
    {
        public Guid EpicId { get; set; }
        
        public string EpicName { get; set; }
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
        
        public string EpicDescription { get; set; }
        
        public double Progress { get; set; }
    }
}