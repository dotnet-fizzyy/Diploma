using System;
using System.Collections.Generic;
using WebAPI.Models.Models;

namespace WebAPI.Models.Result
{
    public class FullProject
    {
        public FullProject()
        {
            Epics = new List<Epic>();
            Teams = new List<Team>();
        }
        
        public Guid ProjectId { get; set; }
        
        public string ProjectName { get; set; }
        
        public string ProjectDescription { get; set; }
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
        
        public string Customer { get; set; }
        
        public ICollection<Epic> Epics { get; set; } 
        
        public ICollection<Team> Teams { get; set; }
    }
}