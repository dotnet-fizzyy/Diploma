using System.Collections.Generic;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Presentation.Models.Pages
{
    public class SearchResult
    {
        public IList<TeamSimpleModel> Teams { get; set; } = new List<TeamSimpleModel>();
        
        public IList<ProjectSimpleModel> Projects { get; set; } = new List<ProjectSimpleModel>();
    }
}