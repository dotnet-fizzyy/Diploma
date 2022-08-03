using System.Collections.Generic;
using WebAPI.Models.Light;

namespace WebAPI.Presentation.Models.Pages
{
    public class SearchResult
    {
        public IList<TeamLightModel> Teams { get; set; } = new List<TeamLightModel>();
        
        public IList<ProjectLightModel> Projects { get; set; } = new List<ProjectLightModel>();
    }
}