using System;
using System.Collections.Generic;
using WebAPI.Models.Enums;
using WebAPI.Models.Models;

namespace WebAPI.Models.Result
{
    public class FullStory
    {
        public FullStory()
        {
            StoryHistories = new List<StoryHistory>();    
        }
        
        public Guid StoryId { get; set; }
        
        public string Title { get; set; }
        
        public string Description { get; set; }
        
        public string Notes { get; set; }
        
        public ColumnType ColumnType { get; set; }
        
        public StoryPriority StoryPriority { get; set; }
        
        public int Estimate { get; set; }
        
        public bool IsReady { get; set; }
        
        public bool IsBlocked { get; set; }
        
        public string BlockReason { get; set; }
        
        public DateTime CreationDate { get; set; }
        
        public uint RecordVersion { get; set; } 
        
        public bool IsDeleted { get; set; }
        
        public ICollection<StoryHistory> StoryHistories { get; set; }
    }
}