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
using WebAPI.Models.Basic;
using WebAPI.Models.Complete;
using WebAPI.Models.Extensions;

using ProjectEntity = WebAPI.Core.Entities.Project;

namespace WebAPI.ApplicationLogic.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IUnitOfWork _unitOfWork;
        
        public ProjectService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        
        public async Task<CollectionResponse<Project>> SearchProjectsAsync(
            Guid userId,
            string searchTerm,
            int limit,
            int offset)
        {
            var user = await _unitOfWork.UserRepository.SearchForItemById(userId, includeTracking: false);

            ValidateWorkspaceExistence(user.WorkSpaceId);
            
            var projects = await _unitOfWork.ProjectRepository.SearchAsync(
                user.WorkSpaceId!.Value,
                searchTerm,
                limit,
                offset);

            return new CollectionResponse<Project>
            {
                Items = projects.Select(ProjectMapper.Map).ToList(),
            };
        }

        public async Task<Project> GetByIdAsync(Guid projectId)
        {
            var projectEntity = await _unitOfWork.ProjectRepository
                .SearchForItemById(projectId, includeTracking: false); 
  
            if (projectEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND, 
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(projectId))
                );
            }

            return ProjectMapper.Map(projectEntity);
        }

        public async Task<ProjectComplete> GetCompleteDescriptionAsync(Guid projectId)
        {
            // Receive project description
            var projectEntity = await _unitOfWork.ProjectRepository
                .SearchForItemById(projectId, includeTracking: false);

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
                    SortDirection.Desc)
                ).FirstOrDefault();

            if (projectEpicEntity == null)
            {
                return new ProjectComplete
                {
                    Project = ProjectMapper.Map(projectEntity)
                };
            }
            
            // Receive sprints for teams
            var epicSprints = await _unitOfWork.SprintRepository.SearchForMultipleItemsAsync(
                    sprint => sprint.EpicId == projectEpicEntity.Id,
                    prop => prop.StartDate,
                    SortDirection.Desc);
            
            // Receive teams working on it
            var projectTeams =  await _unitOfWork.TeamRepository
                .SearchForMultipleItemsAsync(project => project.ProjectId == projectId);

            return ProjectAggregator.AggregateFullProjectDescription(
                projectEntity,
                projectEpicEntity,
                epicSprints,
                projectTeams
            );
        }

        public async Task<Project> CreateAsync(Project projectModelToCreate)
        {
            var projectEntity = ProjectMapper.Map(projectModelToCreate);
            projectEntity.CreationDate = DateTime.UtcNow;

            await _unitOfWork.ProjectRepository.CreateAsync(projectEntity);

            await _unitOfWork.CommitAsync();

            return ProjectMapper.Map(projectEntity);
        }

        public async Task<Project> UpdateAsync(Project project)
        {
            var projectEntity = ProjectMapper.Map(project);

            _unitOfWork.ProjectRepository.UpdateItem(projectEntity);

            await _unitOfWork.CommitAsync();

            return ProjectMapper.Map(projectEntity);
        }

        public async Task SoftRemoveAsync(Guid id)
        {
            var projectEntity = new ProjectEntity
            {
                Id = id,
                IsDeleted = true
            };
            
            _unitOfWork.ProjectRepository.UpdateItem(projectEntity, prop => prop.IsDeleted);

            await _unitOfWork.CommitAsync();
        }

        public async Task RemoveAsync(Guid projectId)
        {
            _unitOfWork.EpicRepository.Remove(epic => epic.Id == projectId);
            
            await _unitOfWork.CommitAsync();
        }
        
        
        private static void ValidateWorkspaceExistence(Guid? workspaceId)
        {
            if (!workspaceId.HasValue)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND,
                    "User is not assigned to any workspace"
                );
            }
        }
    }
}