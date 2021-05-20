using System.Collections.Generic;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Presentation.Models.Pages
{
    public class SearchResult
    {
        public IList<UserSimpleModel> Users { get; set; } = new List<UserSimpleModel>();
        
        public IList<StorySimpleModel> Stories { get; set; } = new List<StorySimpleModel>();
    }
}