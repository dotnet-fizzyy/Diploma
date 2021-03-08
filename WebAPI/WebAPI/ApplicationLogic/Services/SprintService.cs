using System;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models;
using WebAPI.Models.Result;

namespace WebAPI.ApplicationLogic.Services
{
    public class SprintService : ISprintService
    {
        private readonly ISprintRepository _sprintRepository;
        private readonly IStoryRepository _storyRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly ISprintMapper _sprintMapper;
        private readonly ITeamMapper _teamMapper;

        public SprintService(
            ISprintRepository sprintRepository, 
            IStoryRepository storyRepository, 
            ITeamRepository teamRepository,
            ISprintMapper sprintMapper,
            ITeamMapper teamMapper
            )
        {
            _sprintRepository = sprintRepository;
            _storyRepository = storyRepository;
            _teamRepository = teamRepository;
            _sprintMapper = sprintMapper;
            _teamMapper = teamMapper;
        }
        
        public async Task<CollectionResponse<Sprint>> GetALlSprints()
        {
            var sprintEntities = await _sprintRepository.SearchForMultipleItemsAsync();

            var collectionResponse = new CollectionResponse<Sprint>
            {
                Items = sprintEntities.Select(_sprintMapper.MapToModel).ToList()
            };

            return collectionResponse;
        }

        public async Task<CollectionResponse<FullSprint>> GetAllSprintsFromEpic(Guid epicId, Guid userId)
        {
            var sprintEntities = await _sprintRepository.GetFullSprintsByEpicId(epicId);
           
            var sprintsCollectionResponse = new CollectionResponse<FullSprint>
            {
                Items = sprintEntities.Select(_sprintMapper.MapToFullModel).ToList()
            };

            return sprintsCollectionResponse;
        }

        public async Task<Sprint> GetSprint(Guid sprintId)
        {
            var sprintEntity = await _sprintRepository
                .SearchForSingleItemAsync(x => x.Id == sprintId);

            if (sprintEntity == null)
            {
                return null;
            }

            var sprintModel = _sprintMapper.MapToModel(sprintEntity);

            return sprintModel;
        }

        public async Task<FullSprint> GetFullSprint(Guid sprintId)
        {
            var sprintEntity = await _sprintRepository
                .SearchForSingleItemAsync(
                    x => x.Id == sprintId,
                    x => x.Stories
                    );

            if (sprintEntity == null)
            {
                return null;
            }

            var sprintFullModel = _sprintMapper.MapToFullModel(sprintEntity);

            return sprintFullModel;
        }

        public async Task<Sprint> CreateSprint(Sprint sprint)
        {
            var sprintEntity = _sprintMapper.MapToEntity(sprint);

            var createdSprintEntity = await _sprintRepository.CreateAsync(sprintEntity);

            var sprintModel = _sprintMapper.MapToModel(createdSprintEntity);

            return sprintModel;
        }

        public async Task<Sprint> UpdateSprint(Sprint sprint)
        {
            var sprintEntity = _sprintMapper.MapToEntity(sprint);

            var updatedSprintEntity = await _sprintRepository.UpdateItemAsync(sprintEntity);

            var sprintModel = _sprintMapper.MapToModel(updatedSprintEntity);

            return sprintModel;
        }

        public async Task RemoveSprint(Guid sprintId)
        {
            using (var scope = new TransactionScope
                (
                    TransactionScopeOption.Required, 
                    new TransactionOptions
                    {
                        IsolationLevel = IsolationLevel.Serializable,
                    },
                    TransactionScopeAsyncFlowOption.Enabled
                )
            )
            {
                await _storyRepository.DeleteAsync(x => x.SprintId == sprintId);
                await _sprintRepository.DeleteAsync(x => x.Id == sprintId);
                
                scope.Complete();
            }
        }
    }
}