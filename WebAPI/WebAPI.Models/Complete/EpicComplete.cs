using System.Collections.Generic;
using WebAPI.Models.Basic;

namespace WebAPI.Models.Complete
{
    public class EpicComplete : Epic
    {
        public IList<Sprint> Sprints { get; set; } = new List<Sprint>();
    }
}