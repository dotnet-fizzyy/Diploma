using System;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.ApplicationLogic.Aggregators;
using WebAPI.ApplicationLogic.Handlers;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Constants;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
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

        private const string MissingEpicsExceptionMessage = "No any epics found with provided project id";
        private const string MissingTeamExceptionMessage = "No any team found with provided team and user ids";

        public PageService(
            IProjectRepository projectRepository, 
            IWorkSpaceRepository workSpaceRepository,
            IEpicRepository epicRepository,
            ITeamRepository teamRepository,
            ISprintRepository sprintRepository,
            IStoryRepository storyRepository
            )
        {
            _workSpaceRepository = workSpaceRepository;
            _projectRepository = projectRepository;
            _epicRepository = epicRepository;
            _teamRepository = teamRepository;
            _sprintRepository = sprintRepository;
            _storyRepository = storyRepository;
        }

        public async Task<DefaultPage> GetDefaultPageAsync(Guid userId)
        {
            var stories = await _storyRepository.SearchForMultipleItemsAsync(
                x => x.UserId == userId, 
                0, 
                Search.StoriesLimit, 
                story => story.CreationDate,
                OrderType.Desc
            );
            var teams = await _teamRepository.GetUserTeams(userId);

            var defaultPageResult = PageAggregator.CreateDefaultPageModel(teams, stories);

            return defaultPageResult;
        }

        public async Task<SearchResult> GetSearchResultsAsync(string searchTerm, Guid[] teamIds)
        {
            var teamEntities = await _teamRepository.GetTeamsBySearchTerm(searchTerm, Search.TeamsLimit, teamIds);
            var projectEntities = await _projectRepository.GetProjectsBySearchTerm(searchTerm, Search.ProjectsLimit, teamIds);

            var searchResults = PageAggregator.CreateSearchResultsByTerm(teamEntities, projectEntities);
            
            return searchResults;
        }

        public async Task<BoardPage> GetBoardPageDataAsync(Guid projectId, Guid teamId, Guid? epicId, Guid? sprintId, Guid userId)
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
                return new BoardPage();
            }
            
            var latestEpic = epicId.HasValue ? epics.First(x => x.Id == epicId) : epics.First();
            var sprints = await _sprintRepository.GetFullSprintsByEpicId(latestEpic.Id, teamId);
            foreach (var sprint in sprints)
            {
                sprint.Stories = StoryHandler.SortStoriesByCriteria(sprint.Stories, SortTypes.Priority, OrderType.Asc);
            }
            
            var boardPage = PageAggregator.CreateBoardPageModel(team, project, epics, sprints);
            
            return boardPage;
        }

        public async Task<TeamPage> GetTeamPageDataAsync(Guid userId, Guid teamId)
        {
            var workSpace = await _workSpaceRepository.GetUserWorkSpaceAsync(userId);
            
            var team = await _teamRepository.GetTeamWithUsers(teamId);

            var teamData = PageAggregator.CreateTeamPageModel(workSpace, team);
            
            return teamData;
        }

        public async Task<ProjectPage> GetProjectPageDataAsync(Guid projectId)
        {
            var project = await _projectRepository.SearchForSingleItemAsync(x => x.Id == projectId, include => include.Teams, include => include.Epics);
            if (project == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntityMessage(nameof(projectId)));
            }

            var projectData = PageAggregator.CreateProjectPageModel(project);
            
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

            var projectWorkSpaceData = PageAggregator.CreateWorkSpacePageModel(workSpace, projects);
            
            return projectWorkSpaceData;
        }

        public async Task<FullStatisticsPage> GetStatisticsPageDataAsync(Guid projectId)
        {
            var project = await _projectRepository.SearchForSingleItemAsync(x => x.Id == projectId);
            
            var epics = await _epicRepository.SearchForMultipleItemsAsync(x => x.ProjectId == projectId, y => y.CreationDate, OrderType.Desc);
            if (epics == null || !epics.Any())
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, MissingEpicsExceptionMessage);
            }
            
            var latestEpic = epics.First();
            var sprints = await _sprintRepository.GetFullSprintsByEpicId(latestEpic.Id);
            
            var statisticsPage = PageAggregator.CreateStatisticsPageModel(project, epics, sprints);
            
            return statisticsPage;
        }

        public async Task<StatisticsPage> GetStatisticsDataForSearchItems(Guid epicId)
        {
            var sprints = await _sprintRepository.GetFullSprintsByEpicId(epicId);
            
            var statisticsPage = PageAggregator.CreateStatisticsPageModel(null, null, sprints);

            return statisticsPage;
        }
    }
}