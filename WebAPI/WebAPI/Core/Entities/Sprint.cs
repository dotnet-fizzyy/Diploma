using System;
using System.Collections.Generic;

namespace WebAPI.Core.Entities
{
    public class Sprint : BaseEntity
    {
        public Guid EpicId { get; set; }
        
        public string SprintName { get; set; }
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
        
        public bool IsDeleted { get; set; }
        
        public IList<Story> Stories { get; set; } = new List<Story>();
    }
}