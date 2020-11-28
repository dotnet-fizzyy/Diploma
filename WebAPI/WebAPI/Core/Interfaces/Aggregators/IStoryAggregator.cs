using WebAPI.Models.Models;
using Story = WebAPI.Core.Entities.Story;

namespace WebAPI.Core.Interfaces.Aggregators
{
    public interface IStoryAggregator
    {
        Story CreateStoryFromUpdateParts(StoryUpdate storyUpdate);
    }
}