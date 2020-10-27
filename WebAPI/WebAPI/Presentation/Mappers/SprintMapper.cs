using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;

namespace WebAPI.Presentation.Mappers
{
    public class SprintMapper : ISprintMapper
    {
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
    }
}