using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Mappers
{
    public interface IStoryMapper
    {
        WebAPI.Core.Entities.Story MapToEntity(WebAPI.Models.Models.Story story);
        
        WebAPI.Models.Models.Story MapToModel(WebAPI.Core.Entities.Story story);
        
        FullStory MapToFullModel(WebAPI.Core.Entities.Story story);
    }
}