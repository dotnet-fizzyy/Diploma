using System.Collections.Generic;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Presentation.Models.Pages
{
    public class ProjectPage
    {
        public Project Project { get; set; }

        public IList<TeamSimpleModel> Teams { get; set; } = new List<TeamSimpleModel>();

        public IList<Epic> Epics { get; set; } = new List<Epic>();
    }
}