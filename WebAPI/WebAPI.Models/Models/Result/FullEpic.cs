using System.Collections.Generic;
using WebAPI.Models.Models.Models;

namespace WebAPI.Models.Models.Result
{
    public class FullEpic : Epic
    {
        public IList<Sprint> Sprints { get; set; } = new List<Sprint>();
    }
}