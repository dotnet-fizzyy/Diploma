using System;
using System.Threading.Tasks;
using System.Transactions;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models.Models;

namespace WebAPI.ApplicationLogic.Services
{
    public class WorkSpaceService : IWorkSpaceService
    {
        private readonly IWorkSpaceRepository _workSpaceRepository;
        private readonly IUserRepository _userRepository;
        private readonly IWorkSpaceMapper _workSpaceMapper;

        public WorkSpaceService(IWorkSpaceRepository workSpaceRepository, IWorkSpaceMapper workSpaceMapper, IUserRepository userRepository)
        {
            _workSpaceRepository = workSpaceRepository;
            _workSpaceMapper = workSpaceMapper;
            _userRepository = userRepository;
        }

        public async Task<WorkSpace> GetWorkSpaceByIdAsync(Guid workSpaceId)
        {
            var workSpaceEntity = await _workSpaceRepository.SearchForSingleItemAsync(x => x.Id == workSpaceId);
            if (workSpaceEntity == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntityMessage(nameof(workSpaceId)));
            }

            var workSpaceModel = _workSpaceMapper.MapToModel(workSpaceEntity);

            return workSpaceModel;
        }

        public async Task<WorkSpace> GetUserWorkSpaceAsync(Guid userId)
        {
            var userWorkSpaceEntity = await _workSpaceRepository.GetUserWorkSpaceAsync(userId);
            if (userWorkSpaceEntity == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntityMessage(nameof(userId)));
            }

            var workSpaceModel = _workSpaceMapper.MapToModel(userWorkSpaceEntity);
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
            var workSpaceEntity = _workSpaceMapper.MapToEntity(workSpace);

            var updatedWorkSpaceEntity = await _workSpaceRepository.UpdateItemAsync(workSpaceEntity);

            var updatedWorkSpaceModel = _workSpaceMapper.MapToModel(updatedWorkSpaceEntity);

            return updatedWorkSpaceModel;
        }

        public async Task RemoveWorkSpaceAsync(Guid workSpaceId)
        {
            await _workSpaceRepository.DeleteAsync(x => x.Id == workSpaceId);
        }

        
        private async Task<WorkSpace> CreateWorkSpace(WorkSpace workSpace)
        {
            var workSpaceEntity = _workSpaceMapper.MapToEntity(workSpace);
            workSpace.CreationDate = DateTime.UtcNow;

            var createdWorkSpaceEntity = await _workSpaceRepository.CreateAsync(workSpaceEntity);

            var createdWorkSpaceModel = _workSpaceMapper.MapToModel(createdWorkSpaceEntity);

            return createdWorkSpaceModel;
        }
    }
}