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
        private readonly IUnitOfWork _unitOfWork;
        
        public ProjectService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Project> GetProjectAsync(Guid projectId)
        {
            var projectEntity = await _unitOfWork.ProjectRepository
                .SearchForSingleItemAsync(project => project.Id == projectId); 
  
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
            var projectEntity = await _unitOfWork.ProjectRepository
                .SearchForSingleItemAsync(project => project.Id == projectId);

            if (projectEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND, 
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(projectId))
                );
            }

            // Receive latest and actual epic for project
            var projectEpicEntity =
                (await _unitOfWork.EpicRepository.SearchForMultipleItemsAsync(
                    epic => epic.ProjectId == projectId,
                    prop => prop.StartDate, 
                    OrderType.Desc)
                ).FirstOrDefault();

            if (projectEpicEntity == null)
            {
                return new FullProjectDescription
                {
                    Project = ProjectMapper.Map(projectEntity)
                };
            }
            
            // Receive sprints for teams
            var epicSprints = await _unitOfWork.SprintRepository.SearchForMultipleItemsAsync(
                    sprint => sprint.EpicId == projectEpicEntity.Id,
                    prop => prop.StartDate,
                    OrderType.Desc);
            
            // Receive teams working on it
            var projectTeams =  await _unitOfWork.TeamRepository
                .SearchForMultipleItemsAsync(project => project.ProjectId == projectId);

            var fullProjectDescription = FullProjectDescriptionAggregator.AggregateFullProjectDescription(
                projectEntity,
                projectEpicEntity,
                epicSprints,
                projectTeams
            );
            
            return fullProjectDescription;
        }

        public async Task<Project> CreateProjectAsync(Project projectModelToCreate)
        {
            var projectEntity = ProjectMapper.Map(projectModelToCreate);
            projectEntity.CreationDate = DateTime.UtcNow;

            await _unitOfWork.ProjectRepository.CreateAsync(projectEntity);

            await _unitOfWork.CommitAsync();

            var createdProjectModel = ProjectMapper.Map(projectEntity);

            return createdProjectModel;
        }

        public async Task<Project> UpdateProjectAsync(Project project)
        {
            var projectEntity = ProjectMapper.Map(project);

            _unitOfWork.ProjectRepository.UpdateItem(projectEntity);

            await _unitOfWork.CommitAsync();

            var updatedProjectModel = ProjectMapper.Map(projectEntity);

            return updatedProjectModel;
        }

        public async Task RemoveProjectSoftAsync(Project project)
        {
            _unitOfWork.ProjectRepository.SoftRemove(project.ProjectId);

            await _unitOfWork.CommitAsync();
        }

        public async Task RemoveProjectAsync(Guid projectId)
        {
            _unitOfWork.EpicRepository.Remove(epic => epic.Id == projectId);
            
            await _unitOfWork.CommitAsync();
        }
    }
}