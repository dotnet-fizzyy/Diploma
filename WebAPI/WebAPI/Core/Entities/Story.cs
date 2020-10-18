using System;
using WebAPI.Core.Enums;

namespace WebAPI.Core.Entities
{
    public class Story
    {
        public Guid StoryId { get; set; }
        
        public string Title { get; set; }
        
        public string Description { get; set; }
        
        public string Notes { get; set; }
        
        public ColumnType ColumnType { get; set; }
        
        public int Estimate { get; set; }
        
        public bool IsReady { get; set; }
        
        public bool IsBlocked { get; set; }
        
        public string BlockReason { get; set; }
        
        public DateTime CreationDate { get; set; }
        
        public uint RecordVersion { get; set; } 
        
        public bool IsDeleted { get; set; }
    }
}