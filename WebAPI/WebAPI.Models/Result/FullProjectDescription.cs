using WebAPI.Models.Models;

namespace WebAPI.Models.Result
{
    public class FullProjectDescription
    {
        public Project Project { get; set; }
        
        public Epic Epic { get; set; }
        
        public CollectionResponse<FullSprint> Sprints { get; set; }
        
        public CollectionResponse<FullTeam> Teams { get; set; }
    }
}