using System;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.ApplicationLogic.Utilities;
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
        private readonly IPageAggregator _pageAggregator;
        
        public PageService(
            IProjectRepository projectRepository, 
            IWorkSpaceRepository workSpaceRepository,
            IEpicRepository epicRepository,
            ITeamRepository teamRepository,
            ISprintRepository sprintRepository,
            IStoryHistoryRepository storyHistoryRepository,
            IPageAggregator pageAggregator
            )
        {
            _workSpaceRepository = workSpaceRepository;
            _projectRepository = projectRepository;
            _epicRepository = epicRepository;
            _teamRepository = teamRepository;
            _sprintRepository = sprintRepository;
            _storyHistoryRepository = storyHistoryRepository;
            _pageAggregator = pageAggregator;
        }

        public async Task<CollectionResponse<StoryHistory>> GetStoryHistoryData(Guid storyId)
        {
            var storyHistoryEntities = await _storyHistoryRepository.SearchForMultipleItemsAsync(x => x.StoryId == storyId);

            var storyHistoryCollection = _pageAggregator.CreateStoryHistoryItems(storyHistoryEntities);
            
            return storyHistoryCollection;
        }

        public async Task<BoardPage> GetBoardPageData(Guid projectId, Guid teamId, Guid userId)
        {
            var epics = await _epicRepository.SearchForMultipleItemsAsync(x => x.ProjectId == projectId, y => y.CreationDate, OrderType.Desc);
            if (epics == null || !epics.Any())
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, "No any epics found with provided project id");
            }
            var latestEpic = epics.First();
            
            var sprints = await _sprintRepository.GetFullSprintsByEpicId(latestEpic.Id);

            var team = await _teamRepository.SearchForSingleItemAsync(x => x.Id == teamId, include => include.Users);

            var boardPage = _pageAggregator.CreateBoardPageModel(team, epics, sprints);
            
            return boardPage;
        }

        public async Task<TeamPage> GetTeamPageData(Guid userId, Guid teamId)
        {
            var workSpace = await _workSpaceRepository.GetUserWorkSpaceAsync(userId);
            
            var team = await _teamRepository.SearchForSingleItemAsync(x => x.Id == teamId, include => include.Users);

            var teamData = _pageAggregator.CreateTeamPageModel(workSpace, team);
            
            return teamData;
        }

        public async Task<ProjectPage> GetProjectPageData(Guid projectId)
        {
            var project = await _projectRepository.SearchForSingleItemAsync(x => x.Id == projectId, include => include.Teams, include => include.Epics);
            if (project == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntityMessage(nameof(projectId)));
            }

            var projectData = _pageAggregator.CreateProjectPageModel(project);
            
            return projectData;
        }

        public async Task<WorkSpacePage> GetUserWorkSpacePageData(UserClaims user)
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