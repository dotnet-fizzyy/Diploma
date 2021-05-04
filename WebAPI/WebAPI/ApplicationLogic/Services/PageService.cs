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
using WebAPI.Core.Models;
using WebAPI.Models.Models;
using WebAPI.Models.Models.Pages;
using WebAPI.Models.Models.Result;

namespace WebAPI.ApplicationLogic.Services
{
    public class PageService : IPageService
    {
        private readonly IWorkSpaceRepository _workSpaceRepository;
        private readonly IProjectRepository _projectRepository;
        private readonly IEpicRepository _epicRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly ISprintRepository _sprintRepository;
        private readonly IStoryHistoryRepository _storyHistoryRepository;
        private readonly IStoryRepository _storyRepository;
        private readonly IPageAggregator _pageAggregator;

        private const string MissingEpicsExceptionMessage = "No any epics found with provided project id";
        private const string MissingTeamExceptionMessage = "No any team found with provided team and user ids";

        public PageService(
            IProjectRepository projectRepository, 
            IWorkSpaceRepository workSpaceRepository,
            IEpicRepository epicRepository,
            ITeamRepository teamRepository,
            ISprintRepository sprintRepository,
            IStoryHistoryRepository storyHistoryRepository,
            IStoryRepository storyRepository,
            IPageAggregator pageAggregator
            )
        {
            _workSpaceRepository = workSpaceRepository;
            _projectRepository = projectRepository;
            _epicRepository = epicRepository;
            _teamRepository = teamRepository;
            _sprintRepository = sprintRepository;
            _storyHistoryRepository = storyHistoryRepository;
            _storyRepository = storyRepository;
            _pageAggregator = pageAggregator;
        }

        public async Task<SearchResult> GetSearchResultsAsync(string term, Guid workSpaceId)
        {
            var epicEntities = await _epicRepository.GetEpicsByEpicNameTermAsync(term, Search.EpicsLimit, workSpaceId);
            var sprintEntities = await _sprintRepository.GetSprintsBySprintNameTermAsync(term, Search.SprintsLimit, workSpaceId);
            var storyEntities = await _storyRepository.GetStoriesByTitleTerm(term, Search.StoriesLimit, workSpaceId);

            var searchResults = _pageAggregator.CreateSearchResultsByTerm(storyEntities, epicEntities, sprintEntities);
            
            return searchResults;
        }

        public async Task<CollectionResponse<StoryHistory>> GetStoryHistoryDataAsync(Guid storyId, Guid userId)
        {
            var storyHistoryEntities = await _storyHistoryRepository.SearchForMultipleItemsAsync(x => x.StoryId == storyId);

            var storyHistoryCollection = _pageAggregator.CreateStoryHistoryItems(storyHistoryEntities);
            
            return storyHistoryCollection;
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

        public async Task<WorkSpacePage> GetUserWorkSpacePageDataAsync(UserClaims user)
        {
            var workSpace = await _workSpaceRepository.GetUserWorkSpaceAsync(user.UserId);
            if (workSpace == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntityMessage(nameof(user.UserId)));
            }

            var projects =
                await _projectRepository.GetProjectWithTeamsByWorkSpaceIdAsync(workSpace.Id);

            var projectWorkSpaceData = _pageAggregator.CreateWorkSpacePageModel(workSpace, projects);
            
            return projectWorkSpaceData;
        }
    }
}