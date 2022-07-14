using System;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.ApplicationLogic.Mappers;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.ApplicationLogic.Services
{
    public class EpicService : IEpicService
    {
        private readonly IEpicRepository _epicRepository;

        public EpicService(IEpicRepository epicRepository)
        {
            _epicRepository = epicRepository;
        }

        public async Task<CollectionResponse<Epic>> GetEpicsFromProjectAsync(Guid projectId)
        {
            var epicEntities = await _epicRepository.SearchForMultipleItemsAsync(x => x.ProjectId == projectId);

            var collectionResponse = new CollectionResponse<Epic>
            {
                Items = epicEntities.Select(EpicMapper.Map).ToList()
            };

            return collectionResponse;
        }

        public async Task<Epic> GetEpicByIdAsync(Guid epicId)
        {
            var epicEntity = await _epicRepository.SearchForSingleItemAsync(x => x.Id == epicId);
            if (epicEntity == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntityMessage(nameof(epicId)));
            }
            
            var epicModel = EpicMapper.Map(epicEntity);
            
            return epicModel;
        }

        public async Task<FullEpic> GetFullEpicDescriptionAsync(Guid epicId)
        {
            var epicEntity = await _epicRepository.SearchForSingleItemAsync(
                    x => x.Id == epicId, 
                    includes => includes.Sprints
                    );
            if (epicEntity == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntityMessage(nameof(epicId)));
            }

            var epicFullModel = EpicMapper.MapToFullModel(epicEntity);
            
            return epicFullModel;
        }

        public async Task<Epic> CreateEpicAsync(Epic epic)
        {
            var epicEntity = EpicMapper.Map(epic);
            epicEntity.CreationDate = DateTime.UtcNow;

            var createdEpicEntity = await _epicRepository.CreateAsync(epicEntity);

            var epicModel = EpicMapper.Map(createdEpicEntity);

            return epicModel;
        }

        public async Task<Epic> UpdateEpicAsync(Epic epic)
        {
            var epicEntity = EpicMapper.Map(epic);

            var updatedEpicEntity =  await _epicRepository.UpdateItemAsync(epicEntity);

            var epicModel = EpicMapper.Map(updatedEpicEntity);

            return epicModel;
        }

        public async Task RemoveEpicSoftAsync(Epic epic)
        {
            await _epicRepository.DeleteSoftAsync(epic.EpicId);
        }

        public async Task RemoveEpicAsync(Guid epicId)
        {
            await _epicRepository.DeleteAsync(x => x.Id == epicId);
        }
    }
}