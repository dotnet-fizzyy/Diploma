using System.Linq;

using SprintEntity = WebAPI.Core.Entities.Sprint;
using SprintModel = WebAPI.Models.Models.Models.Sprint;
using FullSprintModel = WebAPI.Models.Models.Result.FullSprint;

namespace WebAPI.ApplicationLogic.Mappers
{
    public static class SprintMapper
    {
        public static SprintEntity Map(SprintModel sprint)
        {
            if (sprint == null)
            {
                return new SprintEntity();
            }

            var sprintEntity = new SprintEntity
            {
                Id = sprint.SprintId,
                EpicId = sprint.EpicId,
                SprintName = sprint.SprintName,
                StartDate = sprint.StartDate,
                EndDate = sprint.EndDate,
                CreationDate = sprint.CreationDate,
                IsDeleted = sprint.IsDeleted,
            };

            return sprintEntity;
        }

        public static SprintModel Map(SprintEntity sprintEntity)
        {
            if (sprintEntity == null)
            {
                return new SprintModel();
            }

            var sprintModel = new SprintModel();
            
            MapBase(sprintModel, sprintEntity);
            
            return sprintModel;
        }

        public static FullSprintModel MapToFullModel(SprintEntity sprintEntity)
        {
            if (sprintEntity == null)
            {
                return new FullSprintModel();
            }

            var sprintFullModel = new FullSprintModel();
            
            MapBase(sprintFullModel, sprintEntity);

            sprintFullModel.Stories = sprintEntity.Stories.Select(StoryMapper.Map).ToList();

            return sprintFullModel;
        }

        
        private static void MapBase(SprintModel model, SprintEntity entity)
        {
            model.SprintId = entity.Id;
            model.EpicId = entity.EpicId;
            model.SprintName = entity.SprintName;
            model.StartDate = entity.StartDate;
            model.EndDate = entity.EndDate;
            model.CreationDate = entity.CreationDate;
            model.IsDeleted = entity.IsDeleted;
        }
    }
}