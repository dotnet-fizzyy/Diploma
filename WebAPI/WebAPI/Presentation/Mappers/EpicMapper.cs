using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;

namespace WebAPI.Presentation.Mappers
{
    public class EpicMapper : IEpicMapper
    {
        public Epic MapToEntity(Models.Models.Epic epic)
        {
            var entityEpic = new Epic
            {
                EpicId = epic.EpicId,
                EpicName = epic.EpicName,
                EpicDescription = epic.EpicDescription,
                StartDate = epic.StartDate,
                EndDate = epic.EndDate,
                Progress = epic.Progress,
            };

            return entityEpic;
        }

        public Models.Models.Epic MapToModel(Epic epic)
        {
            var epicModel = new Models.Models.Epic
            {
                EpicId = epic.EpicId,
                EpicName = epic.EpicName,
                EpicDescription = epic.EpicDescription,
                StartDate = epic.StartDate,
                EndDate = epic.EndDate,
                Progress = epic.Progress,
            };

            return epicModel;
        }
    }
}