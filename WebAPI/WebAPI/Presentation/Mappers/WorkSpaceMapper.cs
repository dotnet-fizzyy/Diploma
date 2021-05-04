using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Models.Models;

namespace WebAPI.Presentation.Mappers
{
    public class WorkSpaceMapper : IWorkSpaceMapper
    {
        public WorkSpace MapToModel(Core.Entities.WorkSpace entity)
        {
            if (entity == null)
            {
                return new WorkSpace();
            }

            var workSpaceModel = new WorkSpace
            {
                WorkSpaceId = entity.Id,
                WorkSpaceDescription = entity.WorkSpaceDescription,
                WorkSpaceName = entity.WorkSpaceName,
                CreationDate = entity.CreationDate
            };

            return workSpaceModel;
        }

        public Core.Entities.WorkSpace MapToEntity(WorkSpace model)
        {
            if (model == null)
            {
                return new Core.Entities.WorkSpace();
            }

            var workSpaceModel = new Core.Entities.WorkSpace
            {
                Id = model.WorkSpaceId,
                WorkSpaceDescription = model.WorkSpaceDescription,
                WorkSpaceName = model.WorkSpaceName,
                CreationDate = model.CreationDate
            };

            return workSpaceModel;

        }
    }
}