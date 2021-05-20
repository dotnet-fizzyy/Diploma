using System;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.ApplicationLogic.Handlers;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Constants;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Aggregators;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Presentation.Models.Pages;

namespace WebAPI.ApplicationLogic.Services
{
    public class PageService : IPageService
    {
        private readonly IWorkSpaceRepository _workSpaceRepository;
        private readonly IProjectRepository _projectRepository;
        private readonly IEpicRepository _epicRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly ISprintRepository _sprintRepository;
        private readonly IStoryRepository _storyRepository;
        private readonly IUserRepository _userRepository;
        private readonly IPageAggregator _pageAggregator;

        private const string MissingEpicsExceptionMessage = "No any epics found with provided project id";
        private const string MissingTeamExceptionMessage = "No any team found with provided team and user ids";

        public PageService(
            IProjectRepository projectRepository, 
            IWorkSpaceRepository workSpaceRepository,
            IEpicRepository epicRepository,
            ITeamRepository teamRepository,
            ISprintRepository sprintRepository,
            IStoryRepository storyRepository,
            IUserRepository userRepository,
            IPageAggregator pageAggregator
            )
        {
            _workSpaceRepository = workSpaceRepository;
            _projectRepository = projectRepository;
            _epicRepository = epicRepository;
            _teamRepository = teamRepository;
            _sprintRepository = sprintRepository;
            _storyRepository = storyRepository;
            _userRepository = userRepository;
            _pageAggregator = pageAggregator;
        }

        public async Task<SearchResult> GetSearchResultsAsync(string searchTerm, Guid[] teamIds)
        {
            var userEntities = await _userRepository.GetUsersBySearchTermAsync(searchTerm, Search.UsersLimit, teamIds);
            var storyEntities = await _storyRepository.GetStoriesByTitleTerm(searchTerm, Search.StoriesLimit, teamIds);

            var searchResults = _pageAggregator.CreateSearchResultsByTerm(storyEntities, userEntities);
            
            return searchResults;
        }

        public async Task<BoardPage> GetBoardPageDataAsync(Guid projectId, Guid teamId, Guid userId)
        {
            var team = await _teamRepository.GetUserTeamById(teamId, userId);
            if (team == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, MissingTeamExceptionMessage);
            }

            var project = await _projectRepository.SearchForSingleItemAsync(x => x.Id == projectId);
            var epics = await _epicRepository.SearchForMultipleItemsAsync(x => x.ProjectId == projectId, y => y.CreationDate, OrderType.Desc);
            if (epics == null || !epics.Any())
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, MissingEpicsExceptionMessage);
            }
            var latestEpic = epics.First();
            
            var sprints = await _sprintRepository.GetFullSprintsByEpicId(latestEpic.Id);
            foreach (var sprint in sprints)
            {
                sprint.Stories = StoryHandler.SortStoriesByCriteria(sprint.Stories, SortTypes.Priority, OrderType.Asc);
            }
            
            var boardPage = _pageAggregator.CreateBoardPageModel(team, project, epics, sprints);
            
            return boardPage;
        }

        public async Task<TeamPage> GetTeamPageDataAsync(Guid userId, Guid teamId)
        {
            var workSpace = await _workSpaceRepository.GetUserWorkSpaceAsync(userId);
            
            var team = await _teamRepository.GetTeamWithUsers(teamId);

            var teamData = _pageAggregator.CreateTeamPageModel(workSpace, team);
            
            return teamData;
        }

        public async Task<ProjectPage> GetProjectPageDataAsync(Guid projectId)
        {
            var project = await _projectRepository.SearchForSingleItemAsync(x => x.Id == projectId, include => include.Teams, include => include.Epics);
            if (project == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntityMessage(nameof(projectId)));
            }

            var projectData = _pageAggregator.CreateProjectPageModel(project);
            
            return projectData;
        }

        public async Task<WorkSpacePage> GetUserWorkSpacePageDataAsync(Guid userId)
        {
            var workSpace = await _workSpaceRepository.GetUserWorkSpaceAsync(userId);
            if (workSpace == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntityMessage(nameof(userId)));
            }

            var projects = await _projectRepository.GetProjectWithTeamsByWorkSpaceIdAsync(workSpace.Id);

            var projectWorkSpaceData = _pageAggregator.CreateWorkSpacePageModel(workSpace, projects);
            
            return projectWorkSpaceData;
        }

        public async Task<StatisticsPage> GetStatisticsPageDataAsync(Guid projectId)
        {
            var project = await _projectRepository.SearchForSingleItemAsync(x => x.Id == projectId);
            
            var epics = await _epicRepository.SearchForMultipleItemsAsync(x => x.ProjectId == projectId, y => y.CreationDate, OrderType.Desc);
            if (epics == null || !epics.Any())
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, MissingEpicsExceptionMessage);
            }
            
            var latestEpic = epics.First();
            var sprints = await _sprintRepository.GetFullSprintsByEpicId(latestEpic.Id);
            
            var statisticsPage = _pageAggregator.CreateStatisticsPageModel(project, epics, sprints);
            
            return statisticsPage;
        }
    }
}