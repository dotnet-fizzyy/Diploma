using System;
using System.Collections.Generic;
using WebAPI.Models.Models;

namespace WebAPI.Models.Result
{
    public class FullEpic
    {
        public FullEpic()
        {
            Sprints = new List<Sprint>();
        }
        
        public Guid EpicId { get; set; }
        
        public string EpicName { get; set; }
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
        
        public string EpicDescription { get; set; }
        
        public double Progress { get; set; }
        
        public ICollection<Sprint> Sprints { get; set; }
    }
}