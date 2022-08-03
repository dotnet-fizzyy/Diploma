using System.Collections.Generic;
using WebAPI.Models.Basic;

namespace WebAPI.Models.Complete
{
    public class StoryComplete : Story
    {
        public IList<StoryHistory> StoryHistories { get; set; } = new List<StoryHistory>();
    }
}