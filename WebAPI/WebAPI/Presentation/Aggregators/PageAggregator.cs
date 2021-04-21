using System.Collections.Generic;
using System.Linq;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Aggregators;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Models.Pages;
using WebAPI.Models.Models.Result;

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
        private readonly IStoryHistoryMapper _storyHistoryMapper;

        public PageAggregator(
            IWorkSpaceMapper workSpaceMapper, 
            ITeamMapper teamMapper, 
            IProjectMapper projectMapper, 
            IEpicMapper epicMapper,
            ISprintMapper sprintMapper,
            IStoryMapper storyMapper,
            IStoryHistoryMapper storyHistoryMapper
            )
        {
            _workSpaceMapper = workSpaceMapper;
            _teamMapper = teamMapper;
            _projectMapper = projectMapper;
            _epicMapper = epicMapper;
            _sprintMapper = sprintMapper;
            _storyMapper = storyMapper;
            _storyHistoryMapper = storyHistoryMapper;
        }

        public SearchResult CreateSearchResultsByTerm(IList<Story> stories, IList<Epic> epics, IList<Sprint> sprints)
        {
            var searchResults = new SearchResult
            {
                Epics = epics.Select(_epicMapper.MapToSimpleModel).ToList(),
                Sprints = sprints.Select(_sprintMapper.MapToModel).ToList(),
                Stories = stories.Select(_storyMapper.MapToSimpleModel).ToList(),
            };

            return searchResults;
        }

        public CollectionResponse<WebAPI.Models.Models.StoryHistory> CreateStoryHistoryItems(IList<StoryHistory> storyHistories)
        {
            var storyHistoryCollection = new CollectionResponse<WebAPI.Models.Models.StoryHistory>
            {
                Items = storyHistories.Select(_storyHistoryMapper.MapToModel).ToList()
            };

            return storyHistoryCollection;
        }

        public BoardPage CreateBoardPageModel(Team team, IList<Epic> epics, IList<Sprint> sprints)
        {
            var boardPage = new BoardPage
            {
                Team = _teamMapper.MapToFullModel(team),
                Epics = epics.Select(_epicMapper.MapToSimpleModel).ToList(),
                Sprints = sprints.Select(_sprintMapper.MapToModel).ToList(),
                Stories = sprints.SelectMany(x => x.Stories.Select(_storyMapper.MapToModel)).ToList(),
            };

            return boardPage;
        }

        public TeamPage CreateTeamPageModel(WorkSpace workSpace, Team team)
        {
            var teamPageModel = new TeamPage
            {
                WorkSpace = _workSpaceMapper.MapToModel(workSpace),
                Team = _teamMapper.MapToFullModel(team)
            };

            return teamPageModel;
        }

        public ProjectPage CreateProjectPageModel(Project project)
        {
            var projectPage = new ProjectPage
            {
                Project = _projectMapper.MapToModel(project),
                Teams = project.Teams.Select(_teamMapper.MapToSimpleModel).ToList(),
                Epics =  project.Epics.Select(_epicMapper.MapToModel).ToList()
            };

            return projectPage;
        }

        public WorkSpacePage CreateWorkSpacePageModel(WorkSpace workSpace, IEnumerable<Project> projects)
        {
            var workSpacePage = new WorkSpacePage
            {
                WorkSpace = _workSpaceMapper.MapToModel(workSpace),
                Projects = projects.Select(project => new WorkSpacePageProject
                {
                    ProjectId = project.Id,
                    ProjectName = project.ProjectName,
                    Teams = project.Teams.Select(_teamMapper.MapToSimpleModel).ToList(),
                }).ToList(),
            };

            return workSpacePage;
        }
    }
}