using System.Collections.Generic;
using WebAPI.Core.Entities;
using WebAPI.Models.Models.Pages;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Aggregators
{
    public interface IPageAggregator
    {
        SearchResult CreateSearchResultsByTerm(IList<Story> stories, IList<Epic> epics, IList<Sprint> sprints);
        
        CollectionResponse<WebAPI.Models.Models.StoryHistory> CreateStoryHistoryItems(IList<StoryHistory> storyHistories);

        BoardPage CreateBoardPageModel(Team team, Project project, IList<Epic> epics, IList<Sprint> sprints);
        
        TeamPage CreateTeamPageModel(WorkSpace workSpace, Team team);
        
        ProjectPage CreateProjectPageModel(Project project);
        
        WorkSpacePage CreateWorkSpacePageModel(WorkSpace workSpace, IEnumerable<Project> projects);
    }
}