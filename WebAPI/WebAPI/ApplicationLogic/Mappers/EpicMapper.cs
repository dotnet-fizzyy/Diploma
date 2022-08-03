using System.Linq;

using EpicEntity = WebAPI.Core.Entities.Epic;
using EpicModel = WebAPI.Models.Models.Models.Epic;
using FullEpicModel = WebAPI.Models.Models.Result.FullEpic;
using EpicLightModel = WebAPI.Models.Light.EpicLightModel;

namespace WebAPI.ApplicationLogic.Mappers
{
    public static class EpicMapper
    {
        public static EpicEntity Map(EpicModel epic)
        {
            if (epic == null)
            {
                return new EpicEntity();
            }
        
            var entityEpic = new EpicEntity
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

        public static EpicModel Map(EpicEntity epicEntity)
        {
            if (epicEntity == null)
            {
                return new EpicModel();
            }

            var epicModel = new EpicModel();
            
            MapBase(epicModel, epicEntity);

            return epicModel;
        }

        public static FullEpicModel MapToFullModel(EpicEntity epicEntity)
        {
            if (epicEntity == null)
            {
                return new FullEpicModel();
            }

            var epicModel = new FullEpicModel();
            
            MapBase(epicModel, epicEntity);

            epicModel.Sprints = epicEntity.Sprints.Select(SprintMapper.Map).ToList();

            return epicModel;
        }

        public static EpicLightModel MapToSimpleModel(EpicEntity epicEntity)
        {
            if (epicEntity == null)
            {
                return new EpicLightModel();
            }

            var epicSimpleModel = new EpicLightModel
            {
                EpicId = epicEntity.Id,
                EpicName = epicEntity.EpicName,
                StartDate = epicEntity.StartDate,
                EndDate = epicEntity.EndDate
            };

            return epicSimpleModel;
        }


        private static void MapBase(EpicModel model, EpicEntity entity)
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