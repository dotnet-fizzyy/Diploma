using System;
using WebAPI.Models.Enums;

namespace WebAPI.Models.Models.Models
{
    public class StoryHistory
    {
        public Guid StoryHistoryId { get; set; }
        
        public string UserName { get; set; }
        
        public StoryHistoryAction StoryHistoryAction { get; set; }
        
        public string FieldName { get; set; }
        
        public string PreviousValue { get; set; }
        
        public string CurrentValue { get; set; }
        
        public DateTime CreationDate { get; set; }
    }
}