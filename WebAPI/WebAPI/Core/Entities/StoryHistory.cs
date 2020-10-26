using System;
using System.Collections.Generic;
using WebAPI.Core.Enums;

namespace WebAPI.Core.Entities
{
    public class StoryHistory
    {
        public StoryHistory()
        {
            Stories = new List<Story>();
        }
        
        public Guid StoryHistoryId { get; set; }
        
        public StoryHistoryAction StoryHistoryAction { get; set; }
        
        public string FieldName { get; set; }
        
        public string PreviousValue { get; set; }
        
        public string CurrentValue { get; set; }
        
        public uint RecordVersion { get; set; }
        
        public IList<User> Users { get; set; }
        public IList<Story> Stories { get; set; }
    }
}