using System.Collections.Generic;
using WebAPI.Models.Basic;
using WebAPI.Models.Light;

namespace WebAPI.Presentation.Models.Pages
{
    public class WorkSpacePageProject : ProjectLight
    {
        public List<TeamLight> Teams { get; set; } = new List<TeamLight>();
    }
    
    public class WorkSpacePage
    {
        public WorkSpace WorkSpace { get; set; }

        public List<WorkSpacePageProject> Projects { get; set; } = new List<WorkSpacePageProject>();
    }
}