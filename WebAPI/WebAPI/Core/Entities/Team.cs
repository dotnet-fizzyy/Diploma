using System;
using System.Collections.Generic;

namespace WebAPI.Core.Entities
{
    public class Team
    {
        public Team()
        {
            Users = new List<User>();
        }
        
        public Guid TeamId { get; set; }
        
        public string TeamName { get; set; }
        
        public string Location { get; set; }

        public int MembersCount => Users.Count;
        
        public Project Project { get; set; }
            
        public Epic Epic { get; set; }
        public IList<User> Users { get; set; }
    }
}