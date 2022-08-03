using System.Collections.Generic;
using WebAPI.Models.Basic;
using WebAPI.Models.Light;

namespace WebAPI.Presentation.Models.Pages
{
    public class StatisticsPage
    {
        public IList<Sprint> Sprints { get; set; } = new List<Sprint>();

        public IList<StoryLight> Stories { get; set; } = new List<StoryLight>();
    }
}