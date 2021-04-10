using System.Collections.Generic;
using WebAPI.Core.Entities;
using WebAPI.Models.Models.Pages;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Aggregators
{
    public interface IPageAggregator
    {
        FullTeam CreateFullTeamModel(Team team);
        
        ProjectPage CreateProjectPageModel(Project project);
        
        WorkSpacePage CreateWorkSpacePageModel(WorkSpace workSpace, IEnumerable<Project> projects);
    }
}