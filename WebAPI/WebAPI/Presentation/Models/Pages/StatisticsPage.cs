using System.Collections.Generic;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Presentation.Models.Pages
{
    public class StatisticsPage
    {
        public IList<Sprint> Sprints { get; set; } = new List<Sprint>();

        public IList<StorySimpleModel> Stories { get; set; } = new List<StorySimpleModel>();
    }
}