using System.Collections.Generic;
using WebAPI.Models.Models.Models;

namespace WebAPI.Models.Models.Result
{
    public class FullProject : Project
    {
        public IList<Epic> Epics { get; set; } = new List<Epic>();

        public IList<Team> Teams { get; set; } = new List<Team>();
    }
}