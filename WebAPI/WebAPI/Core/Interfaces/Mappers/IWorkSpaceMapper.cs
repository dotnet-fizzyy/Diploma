using WebAPI.Models.Models.Models;

namespace WebAPI.Core.Interfaces.Mappers
{
    public interface IWorkSpaceMapper
    {
        WorkSpace MapToModel(Entities.WorkSpace entity);
        
        Entities.WorkSpace MapToEntity(WorkSpace model);
    }
}