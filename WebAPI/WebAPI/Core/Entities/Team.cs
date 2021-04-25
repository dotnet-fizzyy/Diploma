using System;
using System.Collections.Generic;

namespace WebAPI.Core.Entities
{
    public class Team : BaseEntity
    {
        public Team()
        {
            TeamUsers = new List<TeamUser>();
        }

        public Guid ProjectId { get; set; }

        public string TeamName { get; set; }
        
        public string Location { get; set; }
        
        public int MembersCount => TeamUsers.Count;

        public IList<TeamUser> TeamUsers { get; set; }
    }
}