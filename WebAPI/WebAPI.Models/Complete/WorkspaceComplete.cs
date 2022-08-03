using System.Collections.Generic;
using WebAPI.Models.Basic;

namespace WebAPI.Models.Complete
{
    public class WorkspaceComplete : WorkSpace
    {
        public WorkspaceComplete()
        {
            Users = new List<User>();
            Projects = new List<Project>();
        }
        
        public IList<Project> Projects { get; set; }
        
        public IList<User> Users { get; set; }
    }
}