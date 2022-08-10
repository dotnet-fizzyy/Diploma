using System;

namespace WebAPI.Models.Basic
{
    public class Sprint
    {
        public Guid SprintId { get; set; }

        public Guid EpicId { get; set; }
        
        public string SprintName { get; set; }
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
        
        public DateTime CreationDate { get; set; }
        
        public bool IsDeleted { get; set; }
    }
}