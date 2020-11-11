using System;
using System.Collections.Generic;
using WebAPI.Models.Models;

namespace WebAPI.Models.Result
{
    public class FullTeam
    {
        public FullTeam()
        {
            Users = new List<User>();
        }
        
        public Guid TeamId { get; set; }
        
        public string TeamName { get; set; }
        
        public string Location { get; set; }

        public int MembersCount => Users.Count;
        
        public IList<User> Users { get; set; }
    }
}