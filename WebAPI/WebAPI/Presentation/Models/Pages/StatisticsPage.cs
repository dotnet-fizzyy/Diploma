using System.Collections.Generic;
using WebAPI.Models.Light;
using WebAPI.Models.Models.Models;

namespace WebAPI.Presentation.Models.Pages
{
    public class StatisticsPage
    {
        public IList<Sprint> Sprints { get; set; } = new List<Sprint>();

        public IList<StoryLightModel> Stories { get; set; } = new List<StoryLightModel>();
    }
}