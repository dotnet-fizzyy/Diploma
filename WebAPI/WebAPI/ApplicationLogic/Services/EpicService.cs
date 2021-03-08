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
    public class EpicService : IEpicService
    {
        private readonly IEpicRepository _epicRepository;
        private readonly ISprintRepository _sprintRepository;
        private readonly ITeamEpicRepository _teamEpicRepository;
        private readonly IEpicMapper _epicMapper;

        public EpicService(
            IEpicRepository epicRepository,
            ISprintRepository sprintRepository,
            ITeamEpicRepository teamEpicRepository,
            IEpicMapper epicMapper
            )
        {
            _epicRepository = epicRepository;
            _sprintRepository = sprintRepository;
            _teamEpicRepository = teamEpicRepository;
            _epicMapper = epicMapper;
        }

        public async Task<CollectionResponse<Epic>> GetEpics()
        {
            var epicEntities = await _epicRepository.SearchForMultipleItemsAsync();

            var collectionResponse = new CollectionResponse<Epic>
            {
                Items = epicEntities.Select(_epicMapper.MapToModel).ToList()
            };

            return collectionResponse;
        }

        public async Task<CollectionResponse<Epic>> GetEpicsFromProject(Guid projectId)
        {
            var epicEntities = await _epicRepository.SearchForMultipleItemsAsync(x => x.ProjectId == projectId);

            var collectionResponse = new CollectionResponse<Epic>
            {
                Items = epicEntities.Select(_epicMapper.MapToModel).ToList()
            };

            return collectionResponse;
        }

        public async Task<Epic> GetEpic(Guid epicId)
        {
            var epicEntity =
                await _epicRepository.SearchForSingleItemAsync(x => x.Id == epicId);

            var epicModel = _epicMapper.MapToModel(epicEntity);
            
            return epicModel;
        }

        public async Task<FullEpic> GetFullEpicDescription(Guid epicId)
        {
            var epicEntity =
                await _epicRepository.SearchForSingleItemAsync(
                    x => x.Id == epicId, 
                    includes => includes.Sprints
                    );
            

            var epicFullModel = _epicMapper.MapToFullModel(epicEntity);
            
            return epicFullModel;
        }

        public async Task<Epic> CreateEpic(Epic epic)
        {
            var epicEntity = _epicMapper.MapToEntity(epic);

            var createdEpicEntity = await _epicRepository.CreateAsync(epicEntity);

            var epicModel = _epicMapper.MapToModel(createdEpicEntity);

            return epicModel;
        }

        public async Task<Epic> UpdateEpic(Epic epic)
        {
            var epicEntity = _epicMapper.MapToEntity(epic);

            var updatedEpicEntity =  await _epicRepository.UpdateItemAsync(epicEntity);

            var epicModel = _epicMapper.MapToModel(updatedEpicEntity);

            return epicModel;
        }

        public async Task RemoveEpic(Guid epicId)
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
                await _teamEpicRepository.DeleteAsync(x => x.EpicId == epicId);
                await _sprintRepository.DeleteAsync(x => x.EpicId == epicId);
                await _epicRepository.DeleteAsync(x => x.Id == epicId);
                
                scope.Complete();
            }
        }
    }
}