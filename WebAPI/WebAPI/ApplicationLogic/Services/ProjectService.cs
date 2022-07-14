using System;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.ApplicationLogic.Aggregators;
using WebAPI.ApplicationLogic.Mappers;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.ApplicationLogic.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IEpicRepository _epicRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly ISprintRepository _sprintRepository;

        public ProjectService(
            IProjectRepository projectRepository,
            IEpicRepository epicRepository, 
            ISprintRepository sprintRepository,
            ITeamRepository teamRepository)
        {
            _projectRepository = projectRepository;
            _teamRepository = teamRepository;
            _epicRepository = epicRepository;
            _sprintRepository = sprintRepository;
        }

        public async Task<Project> GetProjectAsync(Guid projectId)
        {
            var projectEntity = await _projectRepository.SearchForSingleItemAsync(x => x.Id == projectId);
            if (projectEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND, 
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(projectId))
                );
            }

            var projectModel = ProjectMapper.Map(projectEntity);

            return projectModel;
        }

        public async Task<FullProjectDescription> GetFullProjectDescriptionAsync(Guid projectId)
        {
            // Receive project description
            var projectEntity = await _projectRepository.SearchForSingleItemAsync(x => x.Id == projectId);
            if (projectEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND, 
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(projectId))
                );
            }

            // Receive latest and actual epic for project
            var projectEpicEntity =
                (await _epicRepository.SearchForMultipleItemsAsync(
                    x => x.ProjectId == projectId,
                    x => x.StartDate, OrderType.Desc)
                ).FirstOrDefault();

            if (projectEpicEntity == null)
            {
                return new FullProjectDescription
                {
                    Project = ProjectMapper.Map(projectEntity)
                };
            }
            
            // Receive sprints for teams
            var epicSprints = await _sprintRepository.SearchForMultipleItemsAsync(
                    x => x.EpicId == projectEpicEntity.Id,
                    x => x.StartDate,
                    OrderType.Desc
                );
            
            // Receive teams working on it
            var projectTeams =  await _teamRepository.SearchForMultipleItemsAsync(x => x.ProjectId == projectId);

            var fullProjectDescription = FullProjectDescriptionAggregator.AggregateFullProjectDescription(
                projectEntity,
                projectEpicEntity,
                epicSprints,
                projectTeams
            );
            
            return fullProjectDescription;
        }

        public async Task<Project> CreateProjectAsync(Project project)
        {
            var projectEntity = ProjectMapper.Map(project);
            projectEntity.CreationDate = DateTime.UtcNow;

            var createdProject = await _projectRepository.CreateAsync(projectEntity);

            var createdProjectModel = ProjectMapper.Map(createdProject);

            return createdProjectModel;
        }

        public async Task<Project> UpdateProjectAsync(Project project)
        {
            var projectEntity = ProjectMapper.Map(project);

            var updatedProject = await _projectRepository.UpdateItemAsync(projectEntity);

            var updatedProjectModel = ProjectMapper.Map(updatedProject);

            return updatedProjectModel;
        }

        public async Task RemoveProjectSoftAsync(Project project)
        {
            await _projectRepository.DeleteSoftAsync(project.ProjectId);
        }

        public async Task RemoveProjectAsync(Guid projectId)
        {
            await _projectRepository.DeleteAsync(x => x.Id == projectId);
        }
    }
}