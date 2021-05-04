using System.Collections.Generic;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Models.Models.Pages
{
    public class StoryHistoryPage
    {
        public IList<UserSimpleModel> Users { get; set; } = new List<UserSimpleModel>();

        public IList<StoryHistory> StoryHistory { get; set; } = new List<StoryHistory>();
    }
}