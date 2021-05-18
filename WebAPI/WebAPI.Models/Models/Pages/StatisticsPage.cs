using System.Collections.Generic;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Models.Models.Pages
{
    public class StatisticsPage
    {
        public Project Project { get; set; }

        public IList<EpicSimpleModel> Epics { get; set; }
        
        public IList<Sprint> Sprints { get; set; } = new List<Sprint>();

        public IList<StorySimpleModel> Stories { get; set; } = new List<StorySimpleModel>();
    }
}