using System;
using System.Collections.Generic;

namespace WebAPI.Core.Entities
{
    public class Project : BaseEntity
    {
        public string ProjectName { get; set; }
        
        public string ProjectDescription { get; set; }
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
        
        public Guid WorkSpaceId { get; set; }
        
        public bool IsDeleted { get; set; }

        public IList<Epic> Epics { get; set; } = new List<Epic>();
        
        public IList<Team> Teams { get; set; } = new List<Team>();
    }
}