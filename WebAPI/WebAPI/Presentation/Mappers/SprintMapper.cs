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
            var sprintEntity = new Sprint
            {
                SprintId = sprint.SprintId,
                SprintName = sprint.SprintName,
                StartDate = sprint.StartDate,
                EndDate = sprint.EndDate,
                Progress = sprint.Progress,
            };

            return sprintEntity;
        }

        public Models.Models.Sprint MapToModel(Sprint sprint)
        {
            var sprintEntity = new Models.Models.Sprint
            {
                SprintId = sprint.SprintId,
                SprintName = sprint.SprintName,
                StartDate = sprint.StartDate,
                EndDate = sprint.EndDate,
                Progress = sprint.Progress,
            };

            return sprintEntity;
        }

        public FullSprint MapToFullModel(Sprint sprint)
        {
            var sprintFullModel = new FullSprint
            {
                SprintId = sprint.SprintId,
                SprintName = sprint.SprintName,
                StartDate = sprint.StartDate,
                EndDate = sprint.EndDate,
                Progress = sprint.Progress,
                Stories = sprint.Stories.Select(_storyMapper.MapToModel).ToList(),
            };

            return sprintFullModel;
        }
    }
}