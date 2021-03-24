using WebAPI.Core.Interfaces.Mappers;

namespace WebAPI.Presentation.Mappers
{
    public class WorkSpaceMapper : IWorkSpaceMapper
    {
        public Models.Models.WorkSpace MapToModel(Core.Entities.WorkSpace entity)
        {
            if (entity == null)
            {
                return new Models.Models.WorkSpace();
            }

            var workSpaceModel = new Models.Models.WorkSpace
            {
                WorkSpaceId = entity.Id,
                WorkSpaceDescription = entity.WorkSpaceDescription,
                WorkSpaceName = entity.WorkSpaceName,
                CreationDate = entity.CreationDate
            };

            return workSpaceModel;
        }

        public Core.Entities.WorkSpace MapToEntity(Models.Models.WorkSpace model)
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