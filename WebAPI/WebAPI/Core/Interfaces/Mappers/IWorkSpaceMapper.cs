namespace WebAPI.Core.Interfaces.Mappers
{
    public interface IWorkSpaceMapper
    {
        WebAPI.Models.Models.WorkSpace MapToModel(Entities.WorkSpace entity);
        
        Entities.WorkSpace MapToEntity(WebAPI.Models.Models.WorkSpace model);
    }
}