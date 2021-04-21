using WebAPI.Models.Models.Result;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Core.Interfaces.Mappers
{
    public interface IStoryMapper
    {
        Entities.Story MapToEntity(WebAPI.Models.Models.Story story);
        
        WebAPI.Models.Models.Story MapToModel(Entities.Story story);
        
        FullStory MapToFullModel(Entities.Story story);

        StorySimpleModel MapToSimpleModel(Entities.Story story);
    }
}