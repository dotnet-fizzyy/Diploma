using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Mappers
{
    public interface ISprintMapper
    {
        WebAPI.Core.Entities.Sprint MapToEntity(Sprint sprint);
        
        Sprint MapToModel(WebAPI.Core.Entities.Sprint sprintEntity);
        
        FullSprint MapToFullModel(WebAPI.Core.Entities.Sprint sprintEntity);
    }
}