using System;
using System.Threading.Tasks;
using WebAPI.ApplicationLogic.Mappers;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Services;

using WorkspaceModel = WebAPI.Models.Basic.WorkSpace;
using UserEntity = WebAPI.Core.Entities.User;

namespace WebAPI.ApplicationLogic.Services
{
    /// <inheritdoc cref="IWorkSpaceService" />
    public class WorkSpaceService : IWorkSpaceService
    {
        private readonly IUnitOfWork _unitOfWork;

        public WorkSpaceService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        /// <inheritdoc cref="IWorkSpaceService.GetByIdAsync" />
        public async Task<WorkspaceModel> GetByIdAsync(Guid id)
        {
            var workSpaceEntity = await _unitOfWork.WorkSpaceRepository
                .SearchForItemById(id, includeTracking: false);

            if (workSpaceEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND,
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(id)));
            }

            var workSpaceModel = WorkSpaceMapper.Map(workSpaceEntity);

            return workSpaceModel;
        }

        /// <inheritdoc cref="IWorkSpaceService.GetUsersWorkSpaceAsync" />
        public async Task<WorkspaceModel> GetUsersWorkSpaceAsync(Guid userId)
        {
            var userWorkSpaceEntity = await _unitOfWork.WorkSpaceRepository.GetUserWorkSpaceAsync(userId);

            if (userWorkSpaceEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND,
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(userId)));
            }

            var workSpaceModel = WorkSpaceMapper.Map(userWorkSpaceEntity);

            return workSpaceModel;
        }

        /// <inheritdoc cref="IWorkSpaceService.CreateAsync" />
        public async Task<WorkspaceModel> CreateAsync(WorkspaceModel workspace)
        {
            var createdWorkSpaceModel = await CreateWorkSpaceAsync(workspace);

            await _unitOfWork.CommitAsync();

            return createdWorkSpaceModel;
        }

        /// <inheritdoc cref="IWorkSpaceService.CreateWithUserAsync" />
        public async Task<WorkspaceModel> CreateWithUserAsync(WorkspaceModel workSpace, Guid userId)
        {
            var createdWorkSpaceModel = await CreateWorkSpaceAsync(workSpace);

            var userEntity = new UserEntity
            {
                Id = userId,
                WorkSpaceId = createdWorkSpaceModel.WorkSpaceId
            };

            _unitOfWork.UserRepository.UpdateItem(userEntity, prop => prop.WorkSpaceId);
            
            await _unitOfWork.CommitAsync();

            return createdWorkSpaceModel;
        }

        /// <inheritdoc cref="IWorkSpaceService.UpdateAsync" />
        public async Task<WorkspaceModel> UpdateAsync(WorkspaceModel workspace)
        {
            var workSpaceEntity = WorkSpaceMapper.Map(workspace);

            _unitOfWork.WorkSpaceRepository.UpdateItem(workSpaceEntity);
            
            await _unitOfWork.CommitAsync();

            var updatedWorkSpaceModel = WorkSpaceMapper.Map(workSpaceEntity);

            return updatedWorkSpaceModel;
        }

        /// <inheritdoc cref="IWorkSpaceService.RemoveAsync" />
        public async Task RemoveAsync(Guid id)
        {
             _unitOfWork.WorkSpaceRepository.Remove(workSpace => workSpace.Id == id);

             await _unitOfWork.CommitAsync();
        }


        private async Task<WorkspaceModel> CreateWorkSpaceAsync(WorkspaceModel workSpace)
        {
            var workSpaceEntity = WorkSpaceMapper.Map(workSpace);
            workSpaceEntity.CreationDate = DateTime.UtcNow;

            await _unitOfWork.WorkSpaceRepository.CreateAsync(workSpaceEntity);
            
            var createdWorkSpaceModel = WorkSpaceMapper.Map(workSpaceEntity);

            return createdWorkSpaceModel;
        }
    }
}