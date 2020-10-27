namespace WebAPI.Core.Interfaces.Mappers
{
    public interface ISprintMapper
    {
        WebAPI.Core.Entities.Sprint MapToEntity(WebAPI.Models.Models.Sprint sprint);
        
        WebAPI.Models.Models.Sprint MapToModel(WebAPI.Core.Entities.Sprint sprint);
    }
}