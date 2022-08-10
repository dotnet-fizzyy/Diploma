using WebAPI.Models.Basic;
using WebAPI.Models.Extensions;

namespace WebAPI.Models.Complete
{
    public class ProjectComplete
    {
        public Project Project { get; set; }
        
        public Epic Epic { get; set; }
        
        public CollectionResponse<SprintComplete> Sprints { get; set; }
        
        public CollectionResponse<TeamComplete> Teams { get; set; }
    }
}