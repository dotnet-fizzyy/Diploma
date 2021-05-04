using System.Collections.Generic;
using WebAPI.Models.Models.Models;

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