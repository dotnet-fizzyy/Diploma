using System;
using System.Collections.Generic;

namespace WebAPI.Core.Entities
{
    public class Team : BaseEntity
    {
        public Guid ProjectId { get; set; }

        public string TeamName { get; set; }
        
        public string Location { get; set; }

        public bool IsDeleted { get; set; }
        
        public int MembersCount => TeamUsers.Count;

        public IList<TeamUser> TeamUsers { get; set; } =  new List<TeamUser>();

        public IList<Story> Stories { get; set; } = new List<Story>();
    }
}