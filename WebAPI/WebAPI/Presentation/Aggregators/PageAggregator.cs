using System.Collections.Generic;
using System.Linq;
using WebAPI.ApplicationLogic.Mappers;
using WebAPI.Core.Entities;
using WebAPI.Models.Models.Result;
using WebAPI.Models.Models.Simple;
using WebAPI.Presentation.Models.Pages;

namespace WebAPI.Presentation.Aggregators
{
    public static class PageAggregator
    {
        public static DefaultPage CreateDefaultPageModel(IList<Team> teams, IList<Story> stories)
        {
            var defaultPageResults = new DefaultPage
            {
                Teams = teams?.Select(TeamMapper.MapToSimpleModel).ToList() ?? new List<TeamSimpleModel>(),
                Stories = stories?.Select(StoryMapper.MapToSimpleModel).ToList() ?? new List<StorySimpleModel>()
            };

            return defaultPageResults;
        }

        public static SearchResult CreateSearchResultsByTerm(IList<Team> teams, IList<Project> projects)
        {
            var searchResults = new SearchResult
            {
                Teams = teams?.Select(TeamMapper.MapToSimpleModel).ToList() ?? new List<TeamSimpleModel>(),
                Projects = projects?.Select(ProjectMapper.MapToSimpleModel).ToList() ?? new List<ProjectSimpleModel>(),
            };

            return searchResults;
        }

        public static BoardPage CreateBoardPageModel(Team team, Project project, IList<Epic> epics, IList<Sprint> sprints)
        {
            var boardPage = new BoardPage
            {
                Project = project != null 
                    ? ProjectMapper.Map(project)
                    : new WebAPI.Models.Models.Models.Project(),
                Team = team != null 
                    ? TeamMapper.MapToFullModel(team)
                    : new FullTeam(),
                Epics = epics?.Select(EpicMapper.MapToSimpleModel).ToList() ?? new List<EpicSimpleModel>(),
                Sprints = sprints?.Select(SprintMapper.Map).ToList() ?? new List<WebAPI.Models.Models.Models.Sprint>(),
                Stories =  sprints?.SelectMany(x => x.Stories.Select(StoryMapper.Map)).ToList() ?? new List<WebAPI.Models.Models.Models.Story>(),
            };

            return boardPage;
        }

        public static TeamPage CreateTeamPageModel(WorkSpace workSpace, Team team)
        {
            var teamPageModel = new TeamPage
            {
                WorkSpace = workSpace != null 
                    ? WorkSpaceMapper.Map(workSpace)
                    : new WebAPI.Models.Models.Models.WorkSpace(),
                Team = team != null 
                    ? TeamMapper.MapToFullModel(team) 
                    : new FullTeam(),
            };

            return teamPageModel;
        }

        public static ProjectPage CreateProjectPageModel(Project project)
        {
            var projectPage = new ProjectPage
            {
                Project = project != null 
                    ? ProjectMapper.Map(project)
                    : new WebAPI.Models.Models.Models.Project(),
                Teams = project != null && project.Teams != null
                    ? project.Teams.Select(TeamMapper.MapToSimpleModel).ToList()
                    : new List<TeamSimpleModel>(),
                Epics = project != null && project.Epics != null
                    ? project.Epics.Select(EpicMapper.Map).ToList()
                    : new List<WebAPI.Models.Models.Models.Epic>()
            };

            return projectPage;
        }

        public static WorkSpacePage CreateWorkSpacePageModel(WorkSpace workSpace, IEnumerable<Project> projects)
        {
            var workSpacePage = new WorkSpacePage
            {
                WorkSpace = workSpace != null 
                    ? WorkSpaceMapper.Map(workSpace)
                    : new WebAPI.Models.Models.Models.WorkSpace(),
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
                    : new WebAPI.Models.Models.Models.Project(),
                Epics =  epics?.Select(EpicMapper.MapToSimpleModel).ToList() ?? new List<EpicSimpleModel>(),
                Sprints = sprints?.Select(SprintMapper.Map).ToList() ?? new List<WebAPI.Models.Models.Models.Sprint>(),
                Stories =  sprints?.SelectMany(x => x.Stories, (_, story) => StoryMapper.MapToSimpleModel(story))
                                   .ToList() ?? new List<StorySimpleModel>()
            };

            return statisticsModel;
        }
    }
}