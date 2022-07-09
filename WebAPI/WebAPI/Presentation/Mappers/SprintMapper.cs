using System.Linq;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Models.Result;

namespace WebAPI.Presentation.Mappers
{
    public class SprintMapper : ISprintMapper
    {
        public Sprint MapToEntity(WebAPI.Models.Models.Models.Sprint sprint)
        {
            if (sprint == null)
            {
                return new Sprint();
            }

            var sprintEntity = new Sprint
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

        public WebAPI.Models.Models.Models.Sprint MapToModel(Sprint sprintEntity)
        {
            if (sprintEntity == null)
            {
                return new WebAPI.Models.Models.Models.Sprint();
            }

            var sprintModel = new WebAPI.Models.Models.Models.Sprint();
            
            MapBaseEntityToModel(sprintModel, sprintEntity);
            
            return sprintModel;
        }

        public FullSprint MapToFullModel(Sprint sprintEntity)
        {
            if (sprintEntity == null)
            {
                return new FullSprint();
            }

            var sprintFullModel = new FullSprint();
            
            MapBaseEntityToModel(sprintFullModel, sprintEntity);

            sprintFullModel.Stories = sprintEntity.Stories.Select(StoryMapper.Map).ToList();

            return sprintFullModel;
        }

        private static void MapBaseEntityToModel(WebAPI.Models.Models.Models.Sprint model, Sprint entity)
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