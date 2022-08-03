using System.Collections.Generic;
using WebAPI.Models.Basic;

namespace WebAPI.Models.Models.Result
{
    public class FullSprint : Sprint
    {
        public IList<Story> Stories { get; set; } = new List<Story>();
    }
}