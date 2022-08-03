using System;
using System.Collections.Generic;
using WebAPI.Models.Basic;

namespace WebAPI.Models.Models.Result
{
    public class FullUser : User
    {
        public IList<UserTeam> Teams { get; set; } = new List<UserTeam>();

        public IList<UserProject> Projects { get; set; } = new List<UserProject>();
    }

    public class UserTeam
    {
        public Guid TeamId { get; set; }
        
        public string TeamName { get; set; }
        
        public Guid ProjectId { get; set; }
    }

    public class UserProject
    {
        public Guid ProjectId { get; set; }
        
        public string ProjectName { get; set; }
    }
}