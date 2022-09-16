using System;
using System.Collections.Generic;

namespace WebAPI.Core.Entities
{
    public class Epic : BaseEntity
    {
        public Guid ProjectId { get; set; }
        
        public string EpicName { get; set; }
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
        
        public string EpicDescription { get; set; }

        public bool IsDeleted { get; set; }
        
        public IList<Sprint> Sprints { get; set; } = new List<Sprint>();
    }
}