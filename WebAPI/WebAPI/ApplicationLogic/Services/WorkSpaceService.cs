using System;
using System.Threading.Tasks;
using System.Transactions;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models.Models;
using WebAPI.Presentation.Mappers;

namespace WebAPI.ApplicationLogic.Services
{
    public class WorkSpaceService : IWorkSpaceService
    {
        private readonly IWorkSpaceRepository _workSpaceRepository;
        private readonly IUserRepository _userRepository;

        public WorkSpaceService(IWorkSpaceRepository workSpaceRepository, IUserRepository userRepository)
        {
            _workSpaceRepository = workSpaceRepository;
            _userRepository = userRepository;
        }

        public async Task<WorkSpace> GetWorkSpaceByIdAsync(Guid workSpaceId)
        {
            var workSpaceEntity = await _workSpaceRepository.SearchForSingleItemAsync(x => x.Id == workSpaceId);
            if (workSpaceEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND,
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(workSpaceId)));
            }

            var workSpaceModel = WorkSpaceMapper.Map(workSpaceEntity);

            return workSpaceModel;
        }

        public async Task<WorkSpace> GetUserWorkSpaceAsync(Guid userId)
        {
            var userWorkSpaceEntity = await _workSpaceRepository.GetUserWorkSpaceAsync(userId);
            if (userWorkSpaceEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND,
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(userId)));
            }

            var workSpaceModel = WorkSpaceMapper.Map(userWorkSpaceEntity);
            return workSpaceModel;
        }

        public async Task<WorkSpace> CreateWorkSpaceAsync(WorkSpace workSpace)
        {
            var createdWorkSpaceModel = await CreateWorkSpace(workSpace);

            return createdWorkSpaceModel;
        }

        public async Task<WorkSpace> CreateWorkSpaceWithUserAsync(WorkSpace workSpace, Guid userId)
        {
            using var scope = new TransactionScope
            (
                TransactionScopeOption.Required,
                new TransactionOptions
                {
                    IsolationLevel = IsolationLevel.Serializable,
                },
                TransactionScopeAsyncFlowOption.Enabled
            );

            var createdWorkSpaceModel = await CreateWorkSpace(workSpace);

            var userEntity = new Core.Entities.User
            {
                Id = userId,
                WorkSpaceId = createdWorkSpaceModel.WorkSpaceId
            };

            await _userRepository.UpdateUserWorkSpace(userEntity);
            
            scope.Complete();
            
            return createdWorkSpaceModel;
        }

        public async Task<WorkSpace> UpdateWorkSpaceAsync(WorkSpace workSpace)
        {
            var workSpaceEntity = WorkSpaceMapper.Map(workSpace);

            var updatedWorkSpaceEntity = await _workSpaceRepository.UpdateItemAsync(workSpaceEntity);

            var updatedWorkSpaceModel = WorkSpaceMapper.Map(updatedWorkSpaceEntity);

            return updatedWorkSpaceModel;
        }

        public async Task RemoveWorkSpaceAsync(Guid workSpaceId)
        {
            await _workSpaceRepository.DeleteAsync(x => x.Id == workSpaceId);
        }

        
        private async Task<WorkSpace> CreateWorkSpace(WorkSpace workSpace)
        {
            var workSpaceEntity = WorkSpaceMapper.Map(workSpace);
            workSpaceEntity.CreationDate = DateTime.UtcNow;

            var createdWorkSpaceEntity = await _workSpaceRepository.CreateAsync(workSpaceEntity);

            var createdWorkSpaceModel = WorkSpaceMapper.Map(createdWorkSpaceEntity);

            return createdWorkSpaceModel;
        }
    }
}