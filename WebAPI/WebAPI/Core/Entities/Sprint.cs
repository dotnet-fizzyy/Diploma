using System;
using System.Collections.Generic;

namespace WebAPI.Core.Entities
{
    public class Sprint : BaseEntity
    {
        public Sprint()
        {
            Stories = new List<Story>();
        }

        public Guid EpicId { get; set; }
        
        public string SprintName { get; set; }
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
        
        public double Progress { get; set; }
        
        public IList<Story> Stories { get; set; }
    }
}