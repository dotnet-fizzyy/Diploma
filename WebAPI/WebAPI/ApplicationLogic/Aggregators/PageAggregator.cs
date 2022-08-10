using System.Collections.Generic;
using System.Linq;
using WebAPI.ApplicationLogic.Mappers;
using WebAPI.Core.Entities;
using WebAPI.Models.Complete;
using WebAPI.Models.Light;
using WebAPI.Presentation.Models.Pages;

namespace WebAPI.ApplicationLogic.Aggregators
{
    public static class PageAggregator
    {
        public static DefaultPage CreateDefaultPageModel(IList<Team> teams, IList<Story> stories)
        {
            var defaultPageResults = new DefaultPage
            {
                Teams = teams?.Select(TeamMapper.MapToSimpleModel).ToList() ?? new List<TeamLight>(),
                Stories = stories?.Select(StoryMapper.MapToSimpleModel).ToList() ?? new List<StoryLight>()
            };

            return defaultPageResults;
        }

        public static SearchResult CreateSearchResultsByTerm(IList<Team> teams, IList<Project> projects)
        {
            var searchResults = new SearchResult
            {
                Teams = teams?.Select(TeamMapper.MapToSimpleModel).ToList() ?? new List<TeamLight>(),
                Projects = projects?.Select(ProjectMapper.MapToLight).ToList() ?? new List<ProjectLight>(),
            };

            return searchResults;
        }

        public static BoardPage CreateBoardPageModel(Team team, Project project, IList<Epic> epics, IList<Sprint> sprints)
        {
            var boardPage = new BoardPage
            {
                Project = project != null 
                    ? ProjectMapper.Map(project)
                    : new Models.Basic.Project(),
                Team = team != null 
                    ? TeamMapper.MapToFullModel(team)
                    : new TeamComplete(),
                Epics = epics?.Select(EpicMapper.MapToLight).ToList() ?? new List<EpicLight>(),
                Sprints = sprints?.Select(SprintMapper.Map).ToList() ?? new List<Models.Basic.Sprint>(),
                Stories =  sprints?.SelectMany(x => x.Stories.Select(StoryMapper.Map)).ToList() ?? new List<Models.Basic.Story>(),
            };

            return boardPage;
        }

        public static TeamPage CreateTeamPageModel(WorkSpace workSpace, Team team)
        {
            var teamPageModel = new TeamPage
            {
                WorkSpace = workSpace != null 
                    ? WorkSpaceMapper.Map(workSpace)
                    : new Models.Basic.WorkSpace(),
                Team = team != null 
                    ? TeamMapper.MapToFullModel(team) 
                    : new TeamComplete(),
            };

            return teamPageModel;
        }

        public static ProjectPage CreateProjectPageModel(Project project)
        {
            var projectPage = new ProjectPage
            {
                Project = project != null 
                    ? ProjectMapper.Map(project)
                    : new Models.Basic.Project(),
                Teams = project != null && project.Teams != null
                    ? project.Teams.Select(TeamMapper.MapToSimpleModel).ToList()
                    : new List<TeamLight>(),
                Epics = project != null && project.Epics != null
                    ? project.Epics.Select(EpicMapper.Map).ToList()
                    : new List<Models.Basic.Epic>()
            };

            return projectPage;
        }

        public static WorkSpacePage CreateWorkSpacePageModel(WorkSpace workSpace, IEnumerable<Project> projects)
        {
            var workSpacePage = new WorkSpacePage
            {
                WorkSpace = workSpace != null 
                    ? WorkSpaceMapper.Map(workSpace)
                    : new Models.Basic.WorkSpace(),
                Projects = projects?.Select(project => new WorkSpacePageProject
                    {
                        ProjectId = project.Id,
                        ProjectName = project.ProjectName,
                        Teams = project.Teams.Select(TeamMapper.MapToSimpleModel).ToList(),
                    }).ToList()
                    ?? new List<WorkSpacePageProject>(),
            };

            return workSpacePage;
        }

        public static FullStatisticsPage CreateStatisticsPageModel(
            Project project,
            IEnumerable<Epic> epics,
            IList<Sprint> sprints)
        {
            var statisticsModel = new FullStatisticsPage
            {
                Project = project != null 
                    ? ProjectMapper.Map(project) 
                    : new Models.Basic.Project(),
                Epics =  epics?.Select(EpicMapper.MapToLight).ToList() ?? new List<EpicLight>(),
                Sprints = sprints?.Select(SprintMapper.Map).ToList() ?? new List<Models.Basic.Sprint>(),
                Stories =  sprints?.SelectMany(x => x.Stories, (_, story) => StoryMapper.MapToSimpleModel(story))
                                   .ToList() ?? new List<StoryLight>()
            };

            return statisticsModel;
        }
    }
}