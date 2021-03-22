using System.Collections.Generic;

namespace WebAPI.Core.Entities
{
    public class WorkSpace : BaseEntity
    {
        public WorkSpace()
        {
            Projects = new List<Project>();
            Users = new List<User>();
        }
        
        public string WorkSpaceName { get; set; }
        
        public string WorkSpaceDescription { get; set; }
        
        public IList<Project> Projects { get; set; }
        
        public IList<User> Users { get; set; }
    }
}