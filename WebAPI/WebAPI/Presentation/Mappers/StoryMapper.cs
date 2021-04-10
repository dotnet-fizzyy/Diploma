using System;
using System.Linq;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Models.Result;
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
            if (story == null)
            {
                return new Story();
            }
            
            var storyEntity = new Story
            {
                Id = story.StoryId,
                UserId = story.UserId,
                SprintId = story.SprintId,
                Description = story.Description,
                Estimate = story.Estimate,
                Notes = story.Notes,
                Title = story.Title,
                IsReady = story.IsReady,
                IsBlocked = story.IsBlocked,
                BlockReason = story.BlockReason,
                CreationDate = story.CreationDate,
                StoryPriority = Enum.Parse<StoryPriority>(story.StoryPriority.ToString()),
                ColumnType = Enum.Parse<ColumnType>(story.ColumnType.ToString()),
                IsDeleted = story.IsDeleted,
                RecordVersion = story.RecordVersion,
            };
            
            return storyEntity;
        }

        public Models.Models.Story MapToModel(Story story)
        {
            if (story == null)
            {
                return new Models.Models.Story();
            }
            
            var storyModel = new Models.Models.Story
            {
                StoryId = story.Id,
                UserId = story.UserId,
                SprintId = story.SprintId,
                Description = story.Description,
                Estimate = story.Estimate,
                Notes = story.Notes,
                Title = story.Title,
                IsReady = story.IsReady,
                IsBlocked = story.IsBlocked,
                BlockReason = story.BlockReason,
                CreationDate = story.CreationDate,
                StoryPriority = Enum.Parse<Models.Enums.StoryPriority>(story.StoryPriority.ToString()),
                ColumnType = Enum.Parse<Models.Enums.ColumnType>(story.ColumnType.ToString()),
                IsDeleted = story.IsDeleted,
                RecordVersion = story.RecordVersion,
            };

            return storyModel;
        }

        public FullStory MapToFullModel(Story story)
        {
            if (story == null)
            {
                return new FullStory();
            }
            
            var fullStoryModel = new FullStory
            {
                StoryId = story.Id,
                UserId = story.UserId,
                SprintId = story.SprintId,
                Description = story.Description,
                Estimate = story.Estimate,
                Notes = story.Notes,
                Title = story.Title,
                IsReady = story.IsReady,
                IsBlocked = story.IsBlocked,
                BlockReason = story.BlockReason,
                CreationDate = story.CreationDate,
                StoryPriority = Enum.Parse<Models.Enums.StoryPriority>(story.StoryPriority.ToString()),
                ColumnType = Enum.Parse<Models.Enums.ColumnType>(story.ColumnType.ToString()),
                IsDeleted = story.IsDeleted,
                RecordVersion = story.RecordVersion,
                StoryHistories = story.StoryHistories.Select(_storyHistoryMapper.MapToModel).ToList(),
            };

            return fullStoryModel;
        }
    }
}