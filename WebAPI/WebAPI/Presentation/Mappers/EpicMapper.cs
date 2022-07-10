using System.Linq;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Models.Result;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Presentation.Mappers
{
    public class EpicMapper : IEpicMapper
    {
        public Epic MapToEntity(WebAPI.Models.Models.Models.Epic epic)
        {
            if (epic == null)
            {
                return new Epic();
            }
        
            var entityEpic = new Epic
            {
                Id = epic.EpicId,
                ProjectId = epic.ProjectId,
                EpicName = epic.EpicName,
                EpicDescription = epic.EpicDescription,
                StartDate = epic.StartDate,
                EndDate = epic.EndDate,
                CreationDate = epic.CreationDate,
                IsDeleted = epic.IsDeleted
            };

            return entityEpic;
        }

        public WebAPI.Models.Models.Models.Epic MapToModel(Epic epicEntity)
        {
            if (epicEntity == null)
            {
                return new WebAPI.Models.Models.Models.Epic();
            }

            var epicModel = new WebAPI.Models.Models.Models.Epic();
            
            MapBaseEntityToModel(epicModel, epicEntity);

            return epicModel;
        }

        public FullEpic MapToFullModel(Epic epicEntity)
        {
            if (epicEntity == null)
            {
                return new FullEpic();
            }

            var epicModel = new FullEpic();
            
            MapBaseEntityToModel(epicModel, epicEntity);
            epicModel.Sprints = epicEntity.Sprints.Select(SprintMapper.Map).ToList();

            return epicModel;
        }

        public EpicSimpleModel MapToSimpleModel(Epic epicEntity)
        {
            if (epicEntity == null)
            {
                return new EpicSimpleModel();
            }

            var epicSimpleModel = new EpicSimpleModel
            {
                EpicId = epicEntity.Id,
                EpicName = epicEntity.EpicName,
                StartDate = epicEntity.StartDate,
                EndDate = epicEntity.EndDate
            };

            return epicSimpleModel;
        }


        private static void MapBaseEntityToModel(WebAPI.Models.Models.Models.Epic model, Epic entity)
        {
            model.EpicId = entity.Id;
            model.ProjectId = entity.ProjectId;
            model.EpicName = entity.EpicName;
            model.EpicDescription = entity.EpicDescription;
            model.StartDate = entity.StartDate;
            model.EndDate = entity.EndDate;
            model.CreationDate = entity.CreationDate;
            model.IsDeleted = entity.IsDeleted;
        }
    }
}