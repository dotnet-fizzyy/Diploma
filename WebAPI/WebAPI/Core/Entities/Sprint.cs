using System;

namespace WebAPI.Core.Entities
{
    public class Sprint
    {
        public Guid SprintId { get; set; }

        public string SprintName { get; set; }
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
        
        public double Progress { get; set; }
    }
}