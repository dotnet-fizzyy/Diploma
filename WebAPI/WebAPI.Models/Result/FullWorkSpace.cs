using System.Collections.Generic;
using WebAPI.Models.Models;

namespace WebAPI.Models.Result
{
    public class FullWorkSpace : WorkSpace
    {
        public FullWorkSpace()
        {
            Users = new List<User>();
            Projects = new List<Project>();
        }
        
        public IList<Project> Projects { get; set; }
        
        public IList<User> Users { get; set; }
    }
}