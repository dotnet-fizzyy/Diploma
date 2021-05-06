using System;
using WebAPI.Core.Enums;

namespace WebAPI.Core.Entities
{
    public class StoryHistory : BaseEntity
    {
        public StoryHistoryAction StoryHistoryAction { get; set; }
        
        public string FieldName { get; set; }
        
        public string PreviousValue { get; set; }
        
        public string CurrentValue { get; set; }

        public string UserName { get; set; }
        
        public Guid StoryId { get; set; }
    }
}