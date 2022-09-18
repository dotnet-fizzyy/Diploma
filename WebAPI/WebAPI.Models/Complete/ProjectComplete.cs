using WebAPI.Models.Basic;
using WebAPI.Models.Extensions;

namespace WebAPI.Models.Complete
{
    public class ProjectComplete
    {
        public Project Project { get; set; }
        
        public CollectionResponse<Epic> Epics { get; set; }

        public CollectionResponse<Team> Teams { get; set; }
    }
}