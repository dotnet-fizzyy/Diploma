using System.Collections.Generic;
using WebAPI.Models.Light;

namespace WebAPI.Presentation.Models.Pages
{
    public class SearchResult
    {
        public IList<TeamLight> Teams { get; set; } = new List<TeamLight>();
        
        public IList<ProjectLight> Projects { get; set; } = new List<ProjectLight>();
    }
}