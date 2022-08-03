using System.Collections.Generic;
using WebAPI.Models.Basic;
using WebAPI.Models.Light;

namespace WebAPI.Presentation.Models.Pages
{
    public class ProjectPage
    {
        public Project Project { get; set; }

        public IList<TeamLight> Teams { get; set; } = new List<TeamLight>();

        public IList<Epic> Epics { get; set; } = new List<Epic>();
    }
}