using System.Collections.Generic;
using WebAPI.Models.Models;

namespace WebAPI.Models.Result
{
    public class FullProjectDescription
    {
        public Epic Epic { get; set; }
        
        public FullSprint Sprint { get; set; }
        
        public FullTeam Team { get; set; }
        
        public ICollection<FullStory> Stories { get; set; }
    }
}