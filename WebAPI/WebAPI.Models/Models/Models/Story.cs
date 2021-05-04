using System;
using WebAPI.Models.Enums;

namespace WebAPI.Models.Models.Models
{
    public class Story
    {
        public Guid StoryId { get; set; }
        
        public Guid? UserId { get; set; }
        
        public Guid? SprintId { get; set; }
        
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
        
        public DateTime CreationDate { get; set; }
        
        public uint RecordVersion { get; set; }

        public bool IsDeleted { get; set; }
    }
}