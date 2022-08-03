using System.Collections.Generic;
using WebAPI.Models.Light;
using WebAPI.Models.Models.Models;

namespace WebAPI.Presentation.Models.Pages
{
    public class WorkSpacePageProject : ProjectLightModel
    {
        public List<TeamLightModel> Teams { get; set; } = new List<TeamLightModel>();
    }
    
    public class WorkSpacePage
    {
        public WorkSpace WorkSpace { get; set; }

        public List<WorkSpacePageProject> Projects { get; set; } = new List<WorkSpacePageProject>();
    }
}