using System.Collections.Generic;
using WebAPI.Models.Basic;
using WebAPI.Models.Light;

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