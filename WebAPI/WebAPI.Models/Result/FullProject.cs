using System.Collections.Generic;
using WebAPI.Models.Models;

namespace WebAPI.Models.Result
{
    public class FullProject : Project
    {
        public FullProject()
        {
            Epics = new List<Epic>();
            Teams = new List<Team>();
        }
        
        public ICollection<Epic> Epics { get; set; } 
        
        public ICollection<Team> Teams { get; set; }
    }
}