using System.Collections.Generic;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Models.Models.Pages
{
    public class SearchResult
    {
        public IList<EpicSimpleModel> Epics { get; set; }
        
        public IList<Sprint> Sprints { get; set; }
        
        public IList<StorySimpleModel> Stories { get; set; }
    }
}