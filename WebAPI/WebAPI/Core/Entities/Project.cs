using System;
using System.Collections.Generic;

namespace WebAPI.Core.Entities
{
    public class Project
    {
        public Project()
        {
            Teams = new List<Team>();
        }
        
        public Guid ProjectId { get; set; }
        
        public string ProjectName { get; set; }
        
        public string ProjectDescription { get; set; }
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
        
        public string Customer { get; set; }
        
        public IList<Team> Teams { get; set; }
    }
}