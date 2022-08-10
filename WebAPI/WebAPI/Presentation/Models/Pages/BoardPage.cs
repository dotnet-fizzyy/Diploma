using System.Collections.Generic;
using WebAPI.Models.Basic;
using WebAPI.Models.Complete;
using WebAPI.Models.Light;

namespace WebAPI.Presentation.Models.Pages
{
    public class BoardPage
    {
        public Project Project { get; set; } = new Project();
        
        public TeamComplete Team { get; set; } = new TeamComplete();
        
        public IList<EpicLight> Epics = new List<EpicLight>();

        public IList<Sprint> Sprints = new List<Sprint>();

        public IList<Story> Stories = new List<Story>();
    }
}