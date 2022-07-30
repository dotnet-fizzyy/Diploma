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

using EpicEntity = WebAPI.Core.Entities.Epic;

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

        public async Task<Epic> GetByIdAsync(Guid id)
        {
            var epicEntity = await _unitOfWork.EpicRepository.SearchForItemById(id);
 
            if (epicEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND, 
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(id)));
            }
            
            var epicModel = EpicMapper.Map(epicEntity);
            
            return epicModel;
        }

        public async Task<FullEpic> GetFullDescriptionAsync(Guid id)
        {
            var epicEntity = await _unitOfWork.EpicRepository
                .SearchForItemById(id, includes => includes.Sprints);
 
            if (epicEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND,
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(id)));
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

        public async Task SoftRemoveAsync(Guid id)
        {
            var epicEntity = new EpicEntity
            {
                Id = id,
                IsDeleted = true
            };

            _unitOfWork.EpicRepository.UpdateItem(epicEntity, prop => prop.IsDeleted);
            
            await _unitOfWork.CommitAsync();
        }

        public async Task RemoveAsync(Guid id)
        {
            _unitOfWork.EpicRepository.Remove(epic => epic.Id == id);

            await _unitOfWork.CommitAsync();
        }
    }
}