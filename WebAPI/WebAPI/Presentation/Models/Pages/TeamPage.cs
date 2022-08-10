using WebAPI.Models.Basic;
using WebAPI.Models.Complete;

namespace WebAPI.Presentation.Models.Pages
{
    public class TeamPage
    {
        public WorkSpace WorkSpace { get; set; }
        
        public TeamComplete Team { get; set; }
    }
}