using System.Collections.Generic;
using WebAPI.Models.Models.Models;

namespace WebAPI.Models.Models.Result
{
    public class FullStory : Story
    {
        public IList<StoryHistory> StoryHistories { get; set; } = new List<StoryHistory>();
    }
}