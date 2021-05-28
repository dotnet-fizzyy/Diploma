using System.Collections.Generic;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Presentation.Models.Pages
{
    public class BoardPage
    {
        public Project Project { get; set; } = new Project();
        
        public FullTeam Team { get; set; } = new FullTeam();
        
        public IList<EpicSimpleModel> Epics = new List<EpicSimpleModel>();

        public IList<Sprint> Sprints = new List<Sprint>();

        public IList<Story> Stories = new List<Story>();
    }
}