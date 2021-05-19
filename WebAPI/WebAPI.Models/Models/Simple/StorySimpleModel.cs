using System;
using WebAPI.Models.Enums;

namespace WebAPI.Models.Models.Simple
{
    public class StorySimpleModel
    {
        public Guid StoryId { get; set; } 
        
        public string Title { get; set; }
        
        public ColumnType ColumnType { get; set; }
        
        public Guid? SprintId { get; set; }
        
        public uint RecordVersion { get; set; }
    }
}