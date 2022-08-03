using System.Collections.Generic;
using WebAPI.Models.Basic;

namespace WebAPI.Models.Models.Result
{
    public class FullStory : Story
    {
        public IList<StoryHistory> StoryHistories { get; set; } = new List<StoryHistory>();
    }
}