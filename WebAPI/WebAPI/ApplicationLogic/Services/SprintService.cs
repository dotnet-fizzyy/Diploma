using System;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;
using WebAPI.Presentation.Mappers;

namespace WebAPI.ApplicationLogic.Services
{
    public class SprintService : ISprintService
    {
        private readonly ISprintRepository _sprintRepository;

        public SprintService(ISprintRepository sprintRepository)
        {
            _sprintRepository = sprintRepository;
        }

        public async Task<CollectionResponse<FullSprint>> GetAllSprintsFromEpicAsync(Guid epicId, Guid? teamId)
        {
            var sprintEntities = await _sprintRepository.GetFullSprintsByEpicId(epicId, teamId);
           
            var sprintsCollectionResponse = new CollectionResponse<FullSprint>
            {
                Items = sprintEntities.Select(SprintMapper.MapToFullModel).ToList()
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

            var sprintModel = SprintMapper.Map(sprintEntity);

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

            var sprintFullModel = SprintMapper.MapToFullModel(sprintEntity);

            return sprintFullModel;
        }

        public async Task<Sprint> CreateSprintAsync(Sprint sprint)
        {
            var sprintEntity = SprintMapper.Map(sprint);
            sprintEntity.CreationDate = DateTime.UtcNow;

            var createdSprintEntity = await _sprintRepository.CreateAsync(sprintEntity);

            var sprintModel = SprintMapper.Map(createdSprintEntity);

            return sprintModel;
        }

        public async Task<Sprint> UpdateSprintAsync(Sprint sprint)
        {
            var sprintEntity = SprintMapper.Map(sprint);

            var updatedSprintEntity = await _sprintRepository.UpdateItemAsync(sprintEntity);

            var sprintModel = SprintMapper.Map(updatedSprintEntity);

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