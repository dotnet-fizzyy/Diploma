using System.Collections.Generic;
using WebAPI.Models.Basic;

namespace WebAPI.Models.Complete
{
    public class SprintComplete : Sprint
    {
        public IList<Story> Stories { get; set; } = new List<Story>();
    }
}