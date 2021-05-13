using System;
using System.Collections.Generic;

namespace WebAPI.Core.Entities
{
    public class Project : BaseEntity
    {
        public Project()
        {
            Epics = new List<Epic>();
            Teams = new List<Team>();
        }

        public string ProjectName { get; set; }
        
        public string ProjectDescription { get; set; }
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
        
        public Guid WorkSpaceId { get; set; }
        
        public bool IsDeleted { get; set; }
        
        public IList<Epic> Epics { get; set; }
        
        public IList<Team> Teams { get; set; }
    }
}