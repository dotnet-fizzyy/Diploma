using System;
using WebAPI.Core.Enums;

namespace WebAPI.Core.Entities
{
    public class StoryHistory
    {
        public Guid StoryHistoryId { get; set; }
        
        public StoryHistoryAction StoryHistoryAction { get; set; }
        
        public string FieldName { get; set; }
        
        public string PreviousValue { get; set; }
        
        public string CurrentValue { get; set; }
    }
}