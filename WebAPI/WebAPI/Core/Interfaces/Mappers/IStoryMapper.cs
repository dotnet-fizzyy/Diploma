using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Core.Interfaces.Mappers
{
    public interface IStoryMapper
    {
        Entities.Story MapToEntity(Story story);
        
        Story MapToModel(Entities.Story story);
        
        FullStory MapToFullModel(Entities.Story story);

        StorySimpleModel MapToSimpleModel(Entities.Story story);
    }
}