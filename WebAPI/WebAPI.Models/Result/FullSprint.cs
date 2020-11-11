using System;
using System.Collections.Generic;
using WebAPI.Models.Models;

namespace WebAPI.Models.Result
{
    public class FullSprint
    {
        public FullSprint()
        {
            Stories = new List<Story>();
        }
        
        public Guid SprintId { get; set; }

        public string SprintName { get; set; }
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
        
        public double Progress { get; set; }
        
        public ICollection<Story> Stories { get; set; }
    }
}