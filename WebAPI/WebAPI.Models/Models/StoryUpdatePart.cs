using System;
using System.Collections.Generic;

namespace WebAPI.Models.Models
{
    public class StoryUpdate
    {
        public StoryUpdate()
        {
            Parts = new List<StoryUpdatePart>();
        }
        
        public Guid StoryId { get; set; }
        
        public uint RecordVersion { get; set; }
        
        public IList<StoryUpdatePart> Parts { get; set; }
    }
    
    public class StoryUpdatePart
    {
        public string Field { get; set; }
        
        public string NewValue { get; set; }
        
        public string PreviousValue { get; set; }
        
        public string UserId { get; set; }
    }
}