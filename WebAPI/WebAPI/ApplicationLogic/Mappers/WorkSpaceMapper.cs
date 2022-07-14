using WorkSpaceEntity = WebAPI.Core.Entities.WorkSpace;
using WorkSpaceModel = WebAPI.Models.Models.Models.WorkSpace;

namespace WebAPI.ApplicationLogic.Mappers
{
    public static class WorkSpaceMapper
    {
        public static WorkSpaceModel Map(WorkSpaceEntity entity)
        {
            if (entity == null)
            {
                return new WorkSpaceModel();
            }

            var workSpaceModel = new WorkSpaceModel
            {
                WorkSpaceId = entity.Id,
                WorkSpaceDescription = entity.WorkSpaceDescription,
                WorkSpaceName = entity.WorkSpaceName,
                CreationDate = entity.CreationDate
            };

            return workSpaceModel;
        }

        public static WorkSpaceEntity Map(WorkSpaceModel model)
        {
            if (model == null)
            {
                return new WorkSpaceEntity();
            }

            var workSpaceModel = new WorkSpaceEntity
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