using System.Collections.Generic;
using WebAPI.Models.Basic;

namespace WebAPI.Models.Complete
{
    public class TeamComplete : Team
    {
        public TeamComplete()
        {
            Users = new List<User>();
        }

        public override int MembersCount => Users.Count;
        
        public IList<User> Users { get; set; }
    }
}