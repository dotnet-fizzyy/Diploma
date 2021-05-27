using System;
using System.Collections.Generic;
using WebAPI.Core.Enums;

namespace WebAPI.Core.Entities
{
    public class Story : BaseEntity
    {
        public Story()
        {
            StoryHistories = new List<StoryHistory>();
        }
        
        public Guid? SprintId { get; set; }
        
        public Guid? TeamId { get; set; }
        
        public Guid? UserId { get; set; }
        
        public string Title { get; set; }
        
        public string Description { get; set; }
        
        public string Notes { get; set; }
        
        public ColumnType ColumnType { get; set; }
        
        public StoryPriority StoryPriority { get; set; }
        
        public UserPosition RequiredPosition { get; set; }
        
        public int Estimate { get; set; }
        
        public bool IsReady { get; set; }
        
        public bool IsBlocked { get; set; }
        
        public string BlockReason { get; set; }

        public uint RecordVersion { get; set; } 
        
        public bool IsDeleted { get; set; }
        
        public IList<StoryHistory> StoryHistories { get; set; }
    }
}