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
        private readonly ISprintMapper _sprintMapper;

        public SprintService(
            ISprintRepository sprintRepository,
            ISprintMapper sprintMapper
            )
        {
            _sprintRepository = sprintRepository;
            _sprintMapper = sprintMapper;
        }

        public async Task<CollectionResponse<FullSprint>> GetAllSprintsFromEpicAsync(Guid epicId)
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

        public async Task RemoveSprintSoftAsync(Sprint sprint)
        {
            using var tr = new TransactionScope(
                TransactionScopeOption.Required,
                new TransactionOptions
                {
                    IsolationLevel = IsolationLevel.RepeatableRead
                }, 
                TransactionScopeAsyncFlowOption.Enabled
            );
            
            await _sprintRepository.DeleteSoftAsync(sprint.SprintId);

            tr.Complete();
        }

        public async Task RemoveSprintAsync(Guid sprintId)
        {
            await _sprintRepository.DeleteAsync(x => x.Id == sprintId);
        }
    }
}