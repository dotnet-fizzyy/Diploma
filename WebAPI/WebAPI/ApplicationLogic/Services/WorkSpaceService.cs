using System;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models.Result;
using WorkSpace = WebAPI.Models.Models.WorkSpace;

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


        public async Task<CollectionResponse<WorkSpace>> GetAllWorkSpacesAsync()
        {
            var workSpaceEntities = await _workSpaceRepository.SearchForMultipleItemsAsync();

            var collectionResponse = new CollectionResponse<WorkSpace>
            {
                Items = workSpaceEntities.Select(_workSpaceMapper.MapToModel).ToList()
            };

            return collectionResponse;
        }

        public async Task<WorkSpace> GetWorkSpaceByIdAsync(Guid workSpaceId)
        {
            var workSpaceEntity = await _workSpaceRepository.SearchForSingleItemAsync(x => x.Id == workSpaceId);

            if (workSpaceEntity == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, "Unable to find workspace with provided id");
            }

            var workSpaceModel = _workSpaceMapper.MapToModel(workSpaceEntity);

            return workSpaceModel;
        }

        public async Task<WorkSpace> GetUserWorkSpaceAsync(Guid userId)
        {
            var userWorkSpaceEntity = await _workSpaceRepository.GetUserWorkSpaceAsync(userId);
            
            if (userWorkSpaceEntity == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, "Unable to find workspace with provided id");
            }

            var workSpaceModel = _workSpaceMapper.MapToModel(userWorkSpaceEntity);
            return workSpaceModel;
        }

        public async Task<WorkSpace> CreateWorkSpaceAsync(WorkSpace workSpace)
        {
            var workSpaceEntity = _workSpaceMapper.MapToEntity(workSpace);
            workSpace.CreationDate = DateTime.UtcNow.ToUniversalTime();

            var createdWorkSpaceEntity = await _workSpaceRepository.CreateAsync(workSpaceEntity);

            var createdWorkSpaceModel = _workSpaceMapper.MapToModel(createdWorkSpaceEntity);

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
            
            var workSpaceEntity = _workSpaceMapper.MapToEntity(workSpace);
            workSpaceEntity.CreationDate = DateTime.UtcNow.ToUniversalTime();
            var createdWorkSpaceEntity = await _workSpaceRepository.CreateAsync(workSpaceEntity);
            
            var userEntity = new User
            {
                Id = userId,
                WorkSpaceId = createdWorkSpaceEntity.Id
            };
            await _userRepository.UpdateUserWorkSpace(userEntity);
            
            scope.Complete();
            
            var createdWorkSpaceModel = _workSpaceMapper.MapToModel(createdWorkSpaceEntity);
            
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
    }
}