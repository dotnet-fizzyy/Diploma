using System.Collections.Generic;
using WebAPI.Models.Models;

namespace WebAPI.Core.Interfaces.Mappers
{
    public interface IStoryHistoryMapper
    {
        WebAPI.Core.Entities.StoryHistory MapToEntity(WebAPI.Models.Models.StoryHistory storyHistory);
        
        WebAPI.Models.Models.StoryHistory MapToModel(WebAPI.Core.Entities.StoryHistory storyHistory);

        List<WebAPI.Core.Entities.StoryHistory> MapToStoryEntityParts(StoryUpdate storyUpdate);
    }
}