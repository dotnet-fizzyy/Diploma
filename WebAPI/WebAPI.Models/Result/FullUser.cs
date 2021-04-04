using System;
using WebAPI.Models.Models;

namespace WebAPI.Models.Result
{
    public class FullUser : User
    {
        public Guid? ProjectId { get; set; }
        
        public string ProjectName { get; set; }
        
        public string TeamName { get; set; }
    }
}