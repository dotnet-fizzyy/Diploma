using System.Linq;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Models.Result;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Presentation.Mappers
{
    public class EpicMapper : IEpicMapper
    {
        private readonly ISprintMapper _sprintMapper;
        
        public EpicMapper(ISprintMapper sprintMapper)
        {
            _sprintMapper = sprintMapper;
        }
        
        public Epic MapToEntity(Models.Models.Models.Epic epic)
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
                CreationDate = epic.CreationDate
            };

            return entityEpic;
        }

        public Models.Models.Models.Epic MapToModel(Epic epicEntity)
        {
            if (epicEntity == null)
            {
                return new Models.Models.Models.Epic();
            }

            var epicModel = new Models.Models.Models.Epic();
            
            MapEpicEntityToModel(epicModel, epicEntity);

            return epicModel;
        }

        public FullEpic MapToFullModel(Epic epicEntity)
        {
            if (epicEntity == null)
            {
                return new FullEpic();
            }

            var epicModel = new FullEpic();
            
            MapEpicEntityToModel(epicModel, epicEntity);
            epicModel.Sprints = epicEntity.Sprints.Select(_sprintMapper.MapToModel).ToList();

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


        private static void MapEpicEntityToModel(Models.Models.Models.Epic model, Epic entity)
        {
            model.EpicId = entity.Id;
            model.ProjectId = entity.ProjectId;
            model.EpicName = entity.EpicName;
            model.EpicDescription = entity.EpicDescription;
            model.StartDate = entity.StartDate;
            model.EndDate = entity.EndDate;
            model.CreationDate = entity.CreationDate;
        }
    }
}