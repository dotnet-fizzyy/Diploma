using System.Linq;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Result;
using ColumnType = WebAPI.Core.Enums.ColumnType;
using StoryPriority = WebAPI.Core.Enums.StoryPriority;

namespace WebAPI.Presentation.Mappers
{
    public class StoryMapper : IStoryMapper
    {
        private readonly IStoryHistoryMapper _storyHistoryMapper;
        public StoryMapper(IStoryHistoryMapper storyHistoryMapper)
        {
            _storyHistoryMapper = storyHistoryMapper;
        }
        
        public Story MapToEntity(Models.Models.Story story)
        {
            var storyEntity = new Story
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
            
            return storyEntity;
        }

        public Models.Models.Story MapToModel(Story story)
        {
            var storyModel = new Models.Models.Story
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

            return storyModel;
        }

        public FullStory MapToFullModel(Story story)
        {
            var fullStoryModel = new FullStory
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
                StoryHistories = story.StoryHistories.Select(_storyHistoryMapper.MapToModel).ToList(),
            };

            return fullStoryModel;
        }
    }
}