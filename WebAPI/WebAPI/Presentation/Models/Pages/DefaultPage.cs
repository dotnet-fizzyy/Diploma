using System.Collections.Generic;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Presentation.Models.Pages
{
    public class DefaultPage
    {
        public IList<StorySimpleModel> Stories = new List<StorySimpleModel>();

        public IList<TeamSimpleModel> Teams = new List<TeamSimpleModel>();
    }
}