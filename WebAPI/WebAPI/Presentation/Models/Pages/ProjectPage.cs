using System.Collections.Generic;
using WebAPI.Models.Light;
using WebAPI.Models.Models.Models;

namespace WebAPI.Presentation.Models.Pages
{
    public class ProjectPage
    {
        public Project Project { get; set; }

        public IList<TeamLightModel> Teams { get; set; } = new List<TeamLightModel>();

        public IList<Epic> Epics { get; set; } = new List<Epic>();
    }
}