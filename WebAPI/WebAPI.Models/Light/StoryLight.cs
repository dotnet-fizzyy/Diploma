using System;
using WebAPI.Models.Enums;

namespace WebAPI.Models.Light
{
    public class StoryLight
    {
        public Guid StoryId { get; set; } 
        
        public string Title { get; set; }
        
        public ColumnType ColumnType { get; set; }
        
        public StoryPriority StoryPriority { get; set; }
        
        public Guid? SprintId { get; set; }
        
        public int Estimate { get; set; }
        
        public bool IsReady { get; set; }
        
        public bool IsBlocked { get; set; }
        
        public uint RecordVersion { get; set; }
    }
}