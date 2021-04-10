using System;

namespace WebAPI.Models.Models.Result
{
    public class FullUser : User
    {
        public Guid? ProjectId { get; set; }
        
        public string ProjectName { get; set; }
        
        public string TeamName { get; set; }
    }
}