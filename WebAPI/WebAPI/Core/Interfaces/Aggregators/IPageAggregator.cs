using System.Collections.Generic;
using WebAPI.Core.Entities;
using WebAPI.Presentation.Models.Pages;

namespace WebAPI.Core.Interfaces.Aggregators
{
    public interface IPageAggregator
    {
        DefaultPage CreateDefaultPageModel(IList<Team> teams, IList<Story> stories);
        
        SearchResult CreateSearchResultsByTerm(IList<Team> teams, IList<Project> projects);

        BoardPage CreateBoardPageModel(Team team, Project project, IList<Epic> epics, IList<Sprint> sprints);
        
        TeamPage CreateTeamPageModel(WorkSpace workSpace, Team team);
        
        ProjectPage CreateProjectPageModel(Project project);
        
        WorkSpacePage CreateWorkSpacePageModel(WorkSpace workSpace, IEnumerable<Project> projects);

        FullStatisticsPage CreateStatisticsPageModel(Project project, IEnumerable<Epic> epics, IList<Sprint> sprints);
    }
}