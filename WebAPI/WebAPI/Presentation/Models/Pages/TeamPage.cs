using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.Presentation.Models.Pages
{
    public class TeamPage
    {
        public WorkSpace WorkSpace { get; set; }
        
        public FullTeam Team { get; set; }
    }
}