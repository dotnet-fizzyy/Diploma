using System;

namespace WebAPI.Models.Models
{
    public class StoryHistory
    {
        public Guid StoryHistoryId { get; set; }
        
        public string StoryHistoryAction { get; set; }
        
        public string FieldName { get; set; }
        
        public string PreviousValue { get; set; }
        
        public string CurrentValue { get; set; }
        
        public uint RecordVersion { get; set; }
    }
}