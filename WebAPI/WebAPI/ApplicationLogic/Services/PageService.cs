using System;
using System.Threading.Tasks;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Aggregators;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Core.Models;
using WebAPI.Models.Models.Pages;
using WebAPI.Models.Models.Result;

namespace WebAPI.ApplicationLogic.Services
{
    public class PageService : IPageService
    {
        private readonly IWorkSpaceRepository _workSpaceRepository;
        private readonly IProjectRepository _projectRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly IPageAggregator _pageAggregator;
        
        public PageService(
            IProjectRepository projectRepository, 
            IWorkSpaceRepository workSpaceRepository,
            ITeamRepository teamRepository,
            IPageAggregator pageAggregator
            )
        {
            _workSpaceRepository = workSpaceRepository;
            _projectRepository = projectRepository;
            _teamRepository = teamRepository;
            _pageAggregator = pageAggregator;
        }

        public async Task<FullTeam> GetTeamPageData(Guid teamId)
        {
            var team = await _teamRepository.SearchForSingleItemAsync(x => x.Id == teamId, include => include.Users);

            var teamData = _pageAggregator.CreateFullTeamModel(team);
            
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