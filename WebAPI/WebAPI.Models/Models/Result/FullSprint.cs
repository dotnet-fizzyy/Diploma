using System;
using System.Collections.Generic;

namespace WebAPI.Models.Models.Result
{
    public class FullSprint
    {
        public FullSprint()
        {
            Stories = new List<Story>();
        }
        
        public Guid SprintId { get; set; }

        public Guid EpicId { get; set; }
        
        public string SprintName { get; set; }
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
        
        public double Progress { get; set; }
        
        public ICollection<Story> Stories { get; set; }
    }
}