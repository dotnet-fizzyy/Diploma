using System;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.ApplicationLogic.Mappers;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Basic;
using WebAPI.Models.Complete;
using WebAPI.Models.Extensions;

using SprintEntity = WebAPI.Core.Entities.Sprint;

namespace WebAPI.ApplicationLogic.Services
{
    public class SprintService : ISprintService
    {
        private readonly IUnitOfWork _unitOfWork;

        public SprintService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<CollectionResponse<SprintComplete>> GetSprintsFromEpicAsync(Guid epicId, Guid? teamId)
        {
            var sprintEntities = await _unitOfWork.SprintRepository.GetFullSprintsByEpicId(epicId, teamId);

            return new CollectionResponse<SprintComplete>
            {
                Items = sprintEntities.Select(SprintMapper.MapToComplete).ToList()
            };
        }

        public async Task<Sprint> GetByIdAsync(Guid id)
        {
            var sprintEntity = await _unitOfWork.SprintRepository.SearchForItemById(id, includeTracking: false);

            if (sprintEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND, 
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(id)));
            }

            return SprintMapper.Map(sprintEntity);
        }

        public async Task<SprintComplete> GetCompleteDescriptionAsync(Guid id)
        {
            var sprintEntity = await _unitOfWork.SprintRepository
                .SearchForItemById(
                    id,
                    includeTracking: false,
                    include => include.Stories);

            if (sprintEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND,
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(id)));
            }

            return SprintMapper.MapToComplete(sprintEntity);
        }

        public async Task<Sprint> CreateAsync(Sprint sprint)
        {
            var sprintEntity = SprintMapper.Map(sprint);
            sprintEntity.CreationDate = DateTime.UtcNow;

            await _unitOfWork.SprintRepository.CreateAsync(sprintEntity);

            await _unitOfWork.CommitAsync();

            return SprintMapper.Map(sprintEntity);
        }

        public async Task<Sprint> UpdateAsync(Sprint sprint)
        {
            var sprintEntity = SprintMapper.Map(sprint);

            _unitOfWork.SprintRepository.UpdateItem(sprintEntity);
            await _unitOfWork.CommitAsync();

            return SprintMapper.Map(sprintEntity);
        }

        public async Task SoftRemoveAsync(Guid id)
        {
            var sprintEntity = new SprintEntity
            {
                Id = id,
                IsDeleted = true
            };
            
            _unitOfWork.SprintRepository.UpdateItem(sprintEntity, prop => prop.IsDeleted);

            await _unitOfWork.CommitAsync();
        }

        public async Task RemoveAsync(Guid id)
        {
            _unitOfWork.SprintRepository.Remove(x => x.Id == id);
            
            await _unitOfWork.CommitAsync();
        }
    }
}