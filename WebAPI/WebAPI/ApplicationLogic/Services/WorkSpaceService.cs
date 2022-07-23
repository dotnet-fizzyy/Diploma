using System;
using System.Threading.Tasks;
using WebAPI.ApplicationLogic.Mappers;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Services;

using WorkspaceModel = WebAPI.Models.Models.Models.WorkSpace;
using UserEntity = WebAPI.Core.Entities.User;

namespace WebAPI.ApplicationLogic.Services
{
    public class WorkSpaceService : IWorkSpaceService
    {
        private readonly IUnitOfWork _unitOfWork;

        public WorkSpaceService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<WorkspaceModel> GetByIdAsync(Guid workSpaceId)
        {
            var workSpaceEntity = await _unitOfWork.WorkSpaceRepository.SearchForSingleItemAsync(
                workSpace => workSpace.Id == workSpaceId);

            if (workSpaceEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND,
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(workSpaceId)));
            }

            var workSpaceModel = WorkSpaceMapper.Map(workSpaceEntity);

            return workSpaceModel;
        }

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

        public async Task<WorkspaceModel> CreateAsync(WorkspaceModel workSpace)
        {
            var createdWorkSpaceModel = await CreateWorkSpaceAsync(workSpace);

            await _unitOfWork.CommitAsync();

            return createdWorkSpaceModel;
        }

        public async Task<WorkspaceModel> CreateWithUserAsync(WorkspaceModel workSpace, Guid userId)
        {
            var createdWorkSpaceModel = await CreateWorkSpaceAsync(workSpace);

            var userEntity = new UserEntity
            {
                Id = userId,
                WorkSpaceId = createdWorkSpaceModel.WorkSpaceId
            };

            await _unitOfWork.UserRepository.UpdateUserWorkSpace(userEntity);
            
            await _unitOfWork.CommitAsync();

            return createdWorkSpaceModel;
        }

        public async Task<WorkspaceModel> UpdateAsync(WorkspaceModel workSpace)
        {
            var workSpaceEntity = WorkSpaceMapper.Map(workSpace);

            _unitOfWork.WorkSpaceRepository.UpdateItem(workSpaceEntity);
            
            await _unitOfWork.CommitAsync();

            var updatedWorkSpaceModel = WorkSpaceMapper.Map(workSpaceEntity);

            return updatedWorkSpaceModel;
        }

        public async Task RemoveAsync(Guid workSpaceId)
        {
             _unitOfWork.WorkSpaceRepository.Remove(workSpace => workSpace.Id == workSpaceId);

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