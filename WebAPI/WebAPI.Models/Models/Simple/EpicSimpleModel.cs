using System;

namespace WebAPI.Models.Models.Simple
{
    public class EpicSimpleModel
    {
        public Guid EpicId { get; set; }
        
        public string EpicName { get; set; }
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
    }
}