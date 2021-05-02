using System.Collections.Generic;

namespace WebAPI.Models.Models.Result
{
    public class FullStory : Story
    {
        public FullStory()
        {
            StoryHistories = new List<StoryHistory>();    
        }

        public ICollection<StoryHistory> StoryHistories { get; set; }
    }
}