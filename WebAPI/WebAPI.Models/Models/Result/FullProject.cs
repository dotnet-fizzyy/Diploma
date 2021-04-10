using System.Collections.Generic;

namespace WebAPI.Models.Models.Result
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