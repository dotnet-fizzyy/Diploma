using System;

namespace WebAPI.Models.Light
{
    public class EpicLight
    {
        public Guid EpicId { get; set; }
        
        public string EpicName { get; set; }
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
    }
}