using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;
using ColumnType = WebAPI.Core.Enums.ColumnType;
using StoryPriority = WebAPI.Core.Enums.StoryPriority;

namespace WebAPI.Presentation.Mappers
{
    public class StoryMapper : IStoryMapper
    {
        public Story MapToEntity(Models.Models.Story story)
        {
            var entityStory = new Story
            {
                StoryId = story.StoryId,
                Description = story.Description,
                Estimate = story.Estimate,
                Notes = story.Notes,
                Title = story.Title,
                IsReady = story.IsReady,
                IsBlocked = story.IsBlocked,
                BlockReason = story.BlockReason,
                CreationDate = story.CreationDate,
                StoryPriority = (StoryPriority)story.StoryPriority,
                ColumnType = (ColumnType)story.ColumnType,
                IsDeleted = story.IsDeleted,
                RecordVersion = story.RecordVersion,
            };
            
            return entityStory;
        }

        public Models.Models.Story MapToModel(Story story)
        {
            var modelStory = new Models.Models.Story
            {
                StoryId = story.StoryId,
                Description = story.Description,
                Estimate = story.Estimate,
                Notes = story.Notes,
                Title = story.Title,
                IsReady = story.IsReady,
                IsBlocked = story.IsBlocked,
                BlockReason = story.BlockReason,
                CreationDate = story.CreationDate,
                StoryPriority = (Models.Enums.StoryPriority)story.StoryPriority,
                ColumnType = (Models.Enums.ColumnType)story.ColumnType,
                IsDeleted = story.IsDeleted,
                RecordVersion = story.RecordVersion,
            };

            return modelStory;
        }
    }
}