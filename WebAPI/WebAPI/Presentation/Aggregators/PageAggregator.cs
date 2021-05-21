using System.Collections.Generic;
using System.Linq;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Aggregators;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Models.Result;
using WebAPI.Models.Models.Simple;
using WebAPI.Presentation.Models.Pages;

namespace WebAPI.Presentation.Aggregators
{
    public class PageAggregator : IPageAggregator
    {
        private readonly IWorkSpaceMapper _workSpaceMapper;
        private readonly ITeamMapper _teamMapper;
        private readonly IProjectMapper _projectMapper;
        private readonly IEpicMapper _epicMapper;
        private readonly ISprintMapper _sprintMapper;
        private readonly IStoryMapper _storyMapper;
        private readonly IUserMapper _userMapper;

        public PageAggregator(
            IWorkSpaceMapper workSpaceMapper, 
            ITeamMapper teamMapper, 
            IProjectMapper projectMapper, 
            IEpicMapper epicMapper,
            ISprintMapper sprintMapper,
            IStoryMapper storyMapper,
            IUserMapper userMapper
            )
        {
            _workSpaceMapper = workSpaceMapper;
            _teamMapper = teamMapper;
            _projectMapper = projectMapper;
            _epicMapper = epicMapper;
            _sprintMapper = sprintMapper;
            _storyMapper = storyMapper;
            _userMapper = userMapper;
        }

        public SearchResult CreateSearchResultsByTerm(IList<Story> stories, IList<User> users)
        {
            var searchResults = new SearchResult
            {
                Users = users != null ? users.Select(_userMapper.MapToSimpleModel).ToList() : new List<UserSimpleModel>(),
                Stories = stories != null 
                    ? stories.Select(_storyMapper.MapToSimpleModel).ToList() 
                    : new List<StorySimpleModel>(),
            };

            return searchResults;
        }

        public BoardPage CreateBoardPageModel(Team team, Project project, IList<Epic> epics, IList<Sprint> sprints)
        {
            var boardPage = new BoardPage
            {
                Project = project != null 
                    ? _projectMapper.MapToModel(project)
                    : new WebAPI.Models.Models.Models.Project(),
                Team = team != null 
                    ? _teamMapper.MapToFullModel(team)
                    : new FullTeam(),
                Epics = epics != null 
                    ? epics.Select(_epicMapper.MapToSimpleModel).ToList()
                    : new List<EpicSimpleModel>(),
                Sprints = sprints != null ?
                    sprints.Select(_sprintMapper.MapToModel).ToList()
                    : new List<WebAPI.Models.Models.Models.Sprint>(),
                Stories = sprints != null 
                    ? sprints.SelectMany(x => x.Stories.Select(_storyMapper.MapToModel)).ToList()
                    : new List<WebAPI.Models.Models.Models.Story>(),
            };

            return boardPage;
        }

        public TeamPage CreateTeamPageModel(WorkSpace workSpace, Team team)
        {
            var teamPageModel = new TeamPage
            {
                WorkSpace = workSpace != null 
                    ? _workSpaceMapper.MapToModel(workSpace)
                    : new WebAPI.Models.Models.Models.WorkSpace(),
                Team = team != null 
                    ? _teamMapper.MapToFullModel(team) 
                    : new FullTeam(),
            };

            return teamPageModel;
        }

        public ProjectPage CreateProjectPageModel(Project project)
        {
            var projectPage = new ProjectPage
            {
                Project = project != null 
                    ? _projectMapper.MapToModel(project)
                    : new WebAPI.Models.Models.Models.Project(),
                Teams = project != null  
                    ? project.Teams.Select(_teamMapper.MapToSimpleModel).ToList()
                    : new List<TeamSimpleModel>(),
                Epics =  project != null 
                    ? project.Epics.Select(_epicMapper.MapToModel).ToList()
                    : new List<WebAPI.Models.Models.Models.Epic>()
            };

            return projectPage;
        }

        public WorkSpacePage CreateWorkSpacePageModel(WorkSpace workSpace, IEnumerable<Project> projects)
        {
            var workSpacePage = new WorkSpacePage
            {
                WorkSpace = workSpace != null 
                    ? _workSpaceMapper.MapToModel(workSpace)
                    : new WebAPI.Models.Models.Models.WorkSpace(),
                Projects = projects != null 
                    ? projects.Select(project => new WorkSpacePageProject
                    {
                        ProjectId = project.Id,
                        ProjectName = project.ProjectName,
                        Teams = project.Teams.Select(_teamMapper.MapToSimpleModel).ToList(),
                    }).ToList()
                    : new List<WorkSpacePageProject>(),
            };

            return workSpacePage;
        }

        public FullStatisticsPage CreateStatisticsPageModel(Project project, IEnumerable<Epic> epics, IList<Sprint> sprints)
        {
            var statisticsModel = new FullStatisticsPage
            {
                Project = project != null 
                    ? _projectMapper.MapToModel(project) 
                    : new WebAPI.Models.Models.Models.Project(),
                Epics = epics != null 
                    ? epics.Select(_epicMapper.MapToSimpleModel).ToList() 
                    : new List<EpicSimpleModel>(),
                Sprints = sprints != null 
                    ? sprints.Select(_sprintMapper.MapToModel).ToList() 
                    : new List<WebAPI.Models.Models.Models.Sprint>(),
                Stories = sprints != null 
                    ? sprints.SelectMany(x => x.Stories, (_, story) => _storyMapper.MapToSimpleModel(story)).ToList() 
                    : new List<StorySimpleModel>()
            };

            return statisticsModel;
        }
    }
}