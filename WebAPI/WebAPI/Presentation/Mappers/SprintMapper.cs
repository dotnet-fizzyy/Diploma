using System.Linq;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Result;

namespace WebAPI.Presentation.Mappers
{
    public class SprintMapper : ISprintMapper
    {
        private readonly IStoryMapper _storyMapper;

        public SprintMapper(IStoryMapper storyMapper)
        {
            _storyMapper = storyMapper;
        }
        
        public Sprint MapToEntity(Models.Models.Sprint sprint)
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
            };

            return sprintEntity;
        }

        public Models.Models.Sprint MapToModel(Sprint sprint)
        {
            if (sprint == null)
            {
                return new Models.Models.Sprint();
            }
            
            var sprintEntity = new Models.Models.Sprint
            {
                SprintId = sprint.Id,
                SprintName = sprint.SprintName,
                StartDate = sprint.StartDate,
                EndDate = sprint.EndDate,
                EpicId = sprint.EpicId,
            };

            return sprintEntity;
        }

        public FullSprint MapToFullModel(Sprint sprint)
        {
            if (sprint == null)
            {
                return new FullSprint();
            }
            
            var sprintFullModel = new FullSprint
            {
                SprintId = sprint.Id,
                EpicId = sprint.EpicId,
                SprintName = sprint.SprintName,
                StartDate = sprint.StartDate,
                EndDate = sprint.EndDate,
                Stories = sprint.Stories.Select(_storyMapper.MapToModel).ToList(),
            };

            return sprintFullModel;
        }
    }
}