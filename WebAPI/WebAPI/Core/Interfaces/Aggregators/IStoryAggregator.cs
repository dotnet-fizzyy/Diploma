using System.Collections.Generic;
using WebAPI.Core.Entities;

namespace WebAPI.Core.Interfaces.Aggregators
{
    public interface IStoryAggregator
    {
        List<StoryHistory> CreateStoryFromUpdateParts(Story storyEntity, Story storyEntityUpdate, string userName, IList<Sprint> sprints);
    }
}