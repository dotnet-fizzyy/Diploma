using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Core.Interfaces.Mappers
{
    public interface IStoryMapper
    {
        Entities.Story MapToEntity(Story story);
        
        Story MapToModel(Entities.Story storyEntity);
        
        FullStory MapToFullModel(Entities.Story storyEntity);

        StorySimpleModel MapToSimpleModel(Entities.Story story);
    }
}