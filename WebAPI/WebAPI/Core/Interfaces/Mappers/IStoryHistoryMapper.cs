namespace WebAPI.Core.Interfaces.Mappers
{
    public interface IStoryHistoryMapper
    {
        Entities.StoryHistory MapToEntity(WebAPI.Models.Models.StoryHistory storyHistory);
        
        WebAPI.Models.Models.StoryHistory MapToModel(Entities.StoryHistory storyHistory);
    }
}