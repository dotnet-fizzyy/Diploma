using System.Collections.Generic;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Presentation.Models.Pages
{
    public class WorkSpacePageProject : ProjectSimpleModel
    {
        public List<TeamSimpleModel> Teams { get; set; } = new List<TeamSimpleModel>();
    }
    
    public class WorkSpacePage
    {
        public WorkSpace WorkSpace { get; set; }

        public List<WorkSpacePageProject> Projects { get; set; } = new List<WorkSpacePageProject>();
    }
}