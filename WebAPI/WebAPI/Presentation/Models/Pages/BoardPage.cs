using System.Collections.Generic;
using WebAPI.Models.Light;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.Presentation.Models.Pages
{
    public class BoardPage
    {
        public Project Project { get; set; } = new Project();
        
        public FullTeam Team { get; set; } = new FullTeam();
        
        public IList<EpicLightModel> Epics = new List<EpicLightModel>();

        public IList<Sprint> Sprints = new List<Sprint>();

        public IList<Story> Stories = new List<Story>();
    }
}