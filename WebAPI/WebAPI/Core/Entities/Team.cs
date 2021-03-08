using System;
using System.Collections.Generic;

namespace WebAPI.Core.Entities
{
    public class Team : BaseEntity
    {
        public Team()
        {
            Users = new List<User>();
            TeamEpics = new List<TeamEpic>();
        }

        public Guid? ProjectId { get; set; }

        public string TeamName { get; set; }
        
        public string Location { get; set; }

        public int MembersCount => Users.Count;

        public IList<User> Users { get; set; }
        
        public IList<TeamEpic> TeamEpics { get; set; }
    }
}