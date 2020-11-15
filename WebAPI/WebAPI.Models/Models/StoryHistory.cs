using System;
using WebAPI.Models.Enums;

namespace WebAPI.Models.Models
{
    public class StoryHistory
    {
        public Guid StoryHistoryId { get; set; }
        
        public Guid UserId { get; set; }
        
        public StoryHistoryAction StoryHistoryAction { get; set; }
        
        public string FieldName { get; set; }
        
        public string PreviousValue { get; set; }
        
        public string CurrentValue { get; set; }
        
        public uint RecordVersion { get; set; }
    }
}