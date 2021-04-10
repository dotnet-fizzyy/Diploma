using System.Linq;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Models.Result;

namespace WebAPI.Presentation.Mappers
{
    public class EpicMapper : IEpicMapper
    {
        private readonly ISprintMapper _sprintMapper;
        
        public EpicMapper(ISprintMapper sprintMapper)
        {
            _sprintMapper = sprintMapper;
        }
        
        public Epic MapToEntity(Models.Models.Epic epic)
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
            };

            return entityEpic;
        }

        public Models.Models.Epic MapToModel(Epic epic)
        {
            if (epic == null)
            {
                return new Models.Models.Epic();
            }
            
            var epicModel = new Models.Models.Epic
            {
                EpicId = epic.Id,
                ProjectId = epic.ProjectId,
                EpicName = epic.EpicName,
                EpicDescription = epic.EpicDescription,
                StartDate = epic.StartDate,
                EndDate = epic.EndDate,
            };

            return epicModel;
        }

        public FullEpic MapToFullModel(Epic epic)
        {
            if (epic == null)
            {
                return new FullEpic();
            }
            
            var epicModel = new FullEpic
            {
                EpicId = epic.Id,
                ProjectId = epic.ProjectId,
                EpicName = epic.EpicName,
                EpicDescription = epic.EpicDescription,
                StartDate = epic.StartDate,
                EndDate = epic.EndDate,
                Sprints = epic.Sprints.Select(_sprintMapper.MapToModel).ToList(),
            };

            return epicModel;
        }
    }
}