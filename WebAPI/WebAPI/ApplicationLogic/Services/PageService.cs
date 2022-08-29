using System;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.ApplicationLogic.Aggregators;
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
        private const string MissingEpicsExceptionMessage = "No any epics found with provided project id";
        private const string MissingTeamExceptionMessage = "No any team found with provided team and user ids";

        private readonly IUnitOfWork _unitOfWork;
        
        public PageService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<DefaultPage> GetDefaultPageAsync(Guid userId)
        {
            var stories = _unitOfWork.StoryRepository.SearchForMultipleItemsAsync(
                story => story.UserId == userId, 
                offset: 0, 
                limit: Search.StoriesLimit, 
                sort: story => story.CreationDate,
                sortDirection: SortDirection.Desc
            );
            var teams = _unitOfWork.TeamRepository.GetUserTeams(userId);

            await Task.WhenAll(stories, teams);

            return PageAggregator.CreateDefaultPageModel(teams.Result, stories.Result);;
        }

        // todo: pass project id
        public async Task<SearchResult> GetSearchResultsAsync(string searchTerm, Guid[] teamIds)
        {
            var teams = await _unitOfWork.TeamRepository.GetTeamsBySearchTerm(
                searchTerm,
                Search.TeamsLimit,
                Search.Offset,
                default,
                teamIds);
            var projects = await _unitOfWork.ProjectRepository.GetProjectsBySearchTerm(
                searchTerm,
                Search.ProjectsLimit,
                Search.Offset,
                teamIds);

            return PageAggregator.CreateSearchResultsByTerm(
                teams,
                projects
            );;
        }

        public async Task<BoardPage> GetBoardPageDataAsync(
            Guid projectId, 
            Guid teamId,
            Guid? epicId, 
            Guid? sprintId, 
            Guid userId)
        {
            var team = await _unitOfWork.TeamRepository.GetUserTeamById(teamId, userId);
            if (team == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, MissingTeamExceptionMessage);
            }

            var project = await _unitOfWork.ProjectRepository.SearchForItemById(projectId, includeTracking: false);
            var epics = await _unitOfWork.EpicRepository.SearchForMultipleItemsAsync(
                epic => epic.ProjectId == projectId, 
                sort: prop => prop.CreationDate, 
                SortDirection.Desc);

            if (epics == null || !epics.Any())
            {
                return new BoardPage();
            }
            
            var latestEpic = epicId.HasValue ? 
                epics.First(epic => epic.Id == epicId) : 
                epics.First();

            var sprints = await _unitOfWork.SprintRepository.GetFullSprintsByEpicId(latestEpic.Id, teamId);
 
            foreach (var sprint in sprints)
            {
                sprint.Stories = StoryUtilities.SortStoriesByCriteria(sprint.Stories, SortTypes.Priority, SortDirection.Asc);
            }

            return PageAggregator.CreateBoardPageModel(team, project, epics, sprints);
        }

        public async Task<TeamPage> GetTeamPageDataAsync(Guid userId, Guid teamId)
        {
            var workSpace = _unitOfWork.WorkSpaceRepository.GetUserWorkSpaceAsync(userId);
            var team = _unitOfWork.TeamRepository.GetTeamWithUsers(teamId);

            await Task.WhenAll(workSpace, team);
            
            return PageAggregator.CreateTeamPageModel(workSpace.Result, team.Result);
        }

        public async Task<ProjectPage> GetProjectPageDataAsync(Guid projectId)
        {
            var project = await _unitOfWork.ProjectRepository
                .SearchForItemById(
                    projectId,
                    includeTracking: false,
                    include => include.Teams,
                    include => include.Epics);

            if (project == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND,
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(projectId)));
            }

            return PageAggregator.CreateProjectPageModel(project);
        }

        public async Task<WorkSpacePage> GetUserWorkSpacePageDataAsync(Guid userId)
        {
            var workSpace = await _unitOfWork.WorkSpaceRepository.GetUserWorkSpaceAsync(userId);

            if (workSpace == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND, 
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(userId)));
            }

            var projects = await _unitOfWork.ProjectRepository
                .SearchForMultipleItemsAsync(
                    project => project.WorkSpaceId == workSpace.Id,
                    project => project.Teams);

            return PageAggregator.CreateWorkSpacePageModel(workSpace, projects);
        }

        public async Task<FullStatisticsPage> GetStatisticsPageDataAsync(Guid projectId)
        {
            var project = _unitOfWork.ProjectRepository.SearchForItemById(projectId, includeTracking: false);
            var epics = _unitOfWork.EpicRepository
                .SearchForMultipleItemsAsync(
                    epic => epic.ProjectId == projectId, 
                    sort: prop => prop.CreationDate, 
                    SortDirection.Desc);

            await Task.WhenAll(project, epics);
            
            if (epics.Result == null || !epics.Result.Any())
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, MissingEpicsExceptionMessage);
            }
            
            var latestEpic = epics.Result.First();

            var sprints = await _unitOfWork.SprintRepository.GetFullSprintsByEpicId(latestEpic.Id);
            
            return PageAggregator.CreateStatisticsPageModel(project.Result, epics.Result, sprints);
        }

        public async Task<StatisticsPage> GetStatisticsDataForSearchItems(Guid epicId)
        {
            var sprints = await _unitOfWork.SprintRepository.GetFullSprintsByEpicId(epicId);
            
            return PageAggregator.CreateStatisticsPageModel(project: null, epics: null, sprints);
        }
    }
}