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
        private readonly IUnitOfWork _unitOfWork;

        public EpicService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<CollectionResponse<Epic>> GetEpicsFromProjectAsync(Guid projectId)
        {
            var epicEntities = await _unitOfWork.EpicRepository
                .SearchForMultipleItemsAsync(epic => epic.ProjectId == projectId);

            var collectionResponse = new CollectionResponse<Epic>
            {
                Items = epicEntities.Select(EpicMapper.Map).ToList()
            };

            return collectionResponse;
        }

        public async Task<Epic> GetByIdAsync(Guid epicId)
        {
            var epicEntity = await _unitOfWork.EpicRepository.SearchForItemById(epicId);
 
            if (epicEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND, 
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(epicId)));
            }
            
            var epicModel = EpicMapper.Map(epicEntity);
            
            return epicModel;
        }

        public async Task<FullEpic> GetFullDescriptionAsync(Guid epicId)
        {
            var epicEntity = await _unitOfWork.EpicRepository
                .SearchForItemById(epicId, includes => includes.Sprints);
 
            if (epicEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND,
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(epicId)));
            }

            var epicFullModel = EpicMapper.MapToFullModel(epicEntity);
            
            return epicFullModel;
        }

        public async Task<Epic> CreateAsync(Epic epic)
        {
            var epicEntity = EpicMapper.Map(epic);
            epicEntity.CreationDate = DateTime.UtcNow;

            await _unitOfWork.EpicRepository.CreateAsync(epicEntity);

            await _unitOfWork.CommitAsync();
            
            var epicModel = EpicMapper.Map(epicEntity);

            return epicModel;
        }

        public async Task<Epic> UpdateAsync(Epic epic)
        {
            var epicEntity = EpicMapper.Map(epic);

            _unitOfWork.EpicRepository.UpdateItem(epicEntity);

            await _unitOfWork.CommitAsync();
            
            var epicModel = EpicMapper.Map(epicEntity);

            return epicModel;
        }

        public async Task SoftRemoveAsync(Epic epic)
        {
            _unitOfWork.EpicRepository.SoftRemove(epic.EpicId);
            
            await _unitOfWork.CommitAsync();
        }

        public async Task RemoveAsync(Guid epicId)
        {
            _unitOfWork.EpicRepository.Remove(epic => epic.Id == epicId);

            await _unitOfWork.CommitAsync();
        }
    }
}