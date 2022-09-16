using System.Collections.Generic;

namespace WebAPI.Core.Entities
{
    public class WorkSpace : BaseEntity
    {
        public string WorkSpaceName { get; set; }
        
        public string WorkSpaceDescription { get; set; }

        public IList<Project> Projects { get; set; } = new List<Project>();

        public IList<User> Users { get; set; } = new List<User>();
    }
}