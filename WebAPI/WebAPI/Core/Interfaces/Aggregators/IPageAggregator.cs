using System.Collections.Generic;
using WebAPI.Core.Entities;
using WebAPI.Presentation.Models.Pages;

namespace WebAPI.Core.Interfaces.Aggregators
{
    public interface IPageAggregator
    {
        SearchResult CreateSearchResultsByTerm(IList<Story> stories, IList<User> users);

        BoardPage CreateBoardPageModel(Team team, Project project, IList<Epic> epics, IList<Sprint> sprints);
        
        TeamPage CreateTeamPageModel(WorkSpace workSpace, Team team);
        
        ProjectPage CreateProjectPageModel(Project project);
        
        WorkSpacePage CreateWorkSpacePageModel(WorkSpace workSpace, IEnumerable<Project> projects);

        FullStatisticsPage CreateStatisticsPageModel(Project project, IEnumerable<Epic> epics, IList<Sprint> sprints);
    }
}