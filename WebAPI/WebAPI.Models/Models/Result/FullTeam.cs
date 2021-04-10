using System.Collections.Generic;

namespace WebAPI.Models.Models.Result
{
    public class FullTeam : Team
    {
        public FullTeam()
        {
            Users = new List<User>();
        }

        public override int MembersCount => Users.Count;
        
        public IList<User> Users { get; set; }
    }
}