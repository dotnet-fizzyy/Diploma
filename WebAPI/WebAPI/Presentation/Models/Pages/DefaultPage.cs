using System.Collections.Generic;
using WebAPI.Models.Light;

namespace WebAPI.Presentation.Models.Pages
{
    public class DefaultPage
    {
        public IList<StoryLightModel> Stories = new List<StoryLightModel>();

        public IList<TeamLightModel> Teams = new List<TeamLightModel>();
    }
}