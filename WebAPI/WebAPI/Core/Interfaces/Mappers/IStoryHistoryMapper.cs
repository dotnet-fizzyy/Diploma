using WebAPI.Models.Models.Models;

namespace WebAPI.Core.Interfaces.Mappers
{
    public interface IStoryHistoryMapper
    {
        Entities.StoryHistory MapToEntity(StoryHistory storyHistory);
        
        StoryHistory MapToModel(Entities.StoryHistory storyHistory);
    }
}