using System;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.ApplicationLogic.Services
{
    public class SprintService : ISprintService
    {
        private readonly ISprintRepository _sprintRepository;
        private readonly IStoryRepository _storyRepository;
        private readonly ISprintMapper _sprintMapper;

        public SprintService(
            ISprintRepository sprintRepository, 
            IStoryRepository storyRepository, 
            ISprintMapper sprintMapper
            )
        {
            _sprintRepository = sprintRepository;
            _storyRepository = storyRepository;
            _sprintMapper = sprintMapper;
        }

        public async Task<CollectionResponse<FullSprint>> GetAllSprintsFromEpicAsync(Guid epicId, Guid userId)
        {
            var sprintEntities = await _sprintRepository.GetFullSprintsByEpicId(epicId);
           
            var sprintsCollectionResponse = new CollectionResponse<FullSprint>
            {
                Items = sprintEntities.Select(_sprintMapper.MapToFullModel).ToList()
            };

            return sprintsCollectionResponse;
        }

        public async Task<Sprint> GetSprintByIdAsync(Guid sprintId)
        {
            var sprintEntity = await _sprintRepository.SearchForSingleItemAsync(x => x.Id == sprintId);

            if (sprintEntity == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntityMessage(nameof(sprintId)));
            }

            var sprintModel = _sprintMapper.MapToModel(sprintEntity);

            return sprintModel;
        }

        public async Task<FullSprint> GetFullSprintAsync(Guid sprintId)
        {
            var sprintEntity = await _sprintRepository
                .SearchForSingleItemAsync(
                    x => x.Id == sprintId,
                    x => x.Stories
                    );

            if (sprintEntity == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntityMessage(nameof(sprintId)));
            }

            var sprintFullModel = _sprintMapper.MapToFullModel(sprintEntity);

            return sprintFullModel;
        }

        public async Task<Sprint> CreateSprintAsync(Sprint sprint)
        {
            var sprintEntity = _sprintMapper.MapToEntity(sprint);
            sprintEntity.CreationDate = DateTime.UtcNow;

            var createdSprintEntity = await _sprintRepository.CreateAsync(sprintEntity);

            var sprintModel = _sprintMapper.MapToModel(createdSprintEntity);

            return sprintModel;
        }

        public async Task<Sprint> UpdateSprintAsync(Sprint sprint)
        {
            var sprintEntity = _sprintMapper.MapToEntity(sprint);

            var updatedSprintEntity = await _sprintRepository.UpdateItemAsync(sprintEntity);

            var sprintModel = _sprintMapper.MapToModel(updatedSprintEntity);

            return sprintModel;
        }

        public async Task RemoveSprintAsync(Guid sprintId)
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
            
            await _storyRepository.DeleteAsync(x => x.SprintId == sprintId);
            await _sprintRepository.DeleteAsync(x => x.Id == sprintId);
                
            scope.Complete();
        }
    }
}