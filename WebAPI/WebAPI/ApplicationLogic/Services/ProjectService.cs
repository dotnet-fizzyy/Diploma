using System;
using System.Collections.Generic;
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
using EpicEntity = WebAPI.Core.Entities.Epic;
using TeamEntity = WebAPI.Core.Entities.Team;

namespace WebAPI.ApplicationLogic.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IUnitOfWork _unitOfWork;
        
        public ProjectService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        
        public async Task<CollectionResponse<Project>> SearchAsync(
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

        public async Task<Project> GetByIdAsync(Guid id)
        {
            var project = await GetProjectByIdAsync(id);
  
            if (project == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND, 
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(id))
                );
            }

            return ProjectMapper.Map(project);
        }

        public async Task<ProjectComplete> GetCompleteDescriptionAsync(Guid projectId)
        {
            var project = await GetProjectByIdAsync(projectId);

            if (project == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND, 
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(projectId))
                );
            }

            var projects = await GetProjectEpicsAsync(projectId);
            var teams = await GetProjectTeamsAsync(projectId);

            return ProjectAggregator.AggregateFullProjectDescription(
                project,
                projects,
                teams
            );
        }

        public async Task<Project> CreateAsync(Project projectToCreate)
        {
            var project = ProjectMapper.Map(projectToCreate);
            project.CreationDate = DateTime.UtcNow;

            await _unitOfWork.ProjectRepository.CreateAsync(project);

            await _unitOfWork.CommitAsync();

            return ProjectMapper.Map(project);
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


        private async Task<ProjectEntity> GetProjectByIdAsync(Guid id) =>
            await _unitOfWork.ProjectRepository.SearchForItemById(id, includeTracking: false);
        
        private async Task<List<EpicEntity>> GetProjectEpicsAsync(Guid projectId) =>
            await _unitOfWork.EpicRepository.SearchForMultipleItemsAsync(
                epic => epic.ProjectId == projectId,
                prop => prop.StartDate,
                SortDirection.Desc);
        
        private async Task<List<TeamEntity>> GetProjectTeamsAsync(Guid projectId) => 
            await _unitOfWork.TeamRepository
                .SearchForMultipleItemsAsync(team => team.ProjectId == projectId);

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