using System;

namespace WebAPI.Models.Basic
{
    public class WorkSpace
    {
        public Guid WorkSpaceId { get; set; }
        
        public string WorkSpaceName { get; set; }
        
        public string WorkSpaceDescription { get; set; }
        
        public DateTime CreationDate { get; set; }
    }
}