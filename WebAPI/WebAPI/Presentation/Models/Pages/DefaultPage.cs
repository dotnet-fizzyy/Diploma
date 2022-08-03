using System.Collections.Generic;
using WebAPI.Models.Light;

namespace WebAPI.Presentation.Models.Pages
{
    public class DefaultPage
    {
        public IList<StoryLight> Stories = new List<StoryLight>();

        public IList<TeamLight> Teams = new List<TeamLight>();
    }
}