using System;
using System.Linq;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Models.Result;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Presentation.Mappers
{
    public class StoryMapper : IStoryMapper
    {
        private readonly IStoryHistoryMapper _storyHistoryMapper;
        
        public StoryMapper(IStoryHistoryMapper storyHistoryMapper)
        {
            _storyHistoryMapper = storyHistoryMapper;
        }
        
        public Story MapToEntity(WebAPI.Models.Models.Models.Story story)
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
                RequiredPosition = Enum.Parse<UserPosition>(story.RequiredPosition.ToString()),
                StoryPriority = Enum.Parse<StoryPriority>(story.StoryPriority.ToString()),
                ColumnType = Enum.Parse<ColumnType>(story.ColumnType.ToString()),
                IsDeleted = story.IsDeleted,
                RecordVersion = story.RecordVersion,
            };
            
            return storyEntity;
        }

        public WebAPI.Models.Models.Models.Story MapToModel(Story storyEntity)
        {
            if (storyEntity == null)
            {
                return new WebAPI.Models.Models.Models.Story();
            }

            var storyModel = new WebAPI.Models.Models.Models.Story();
            
            MapBaseEntityToModel(storyModel, storyEntity);

            return storyModel;
        }

        public FullStory MapToFullModel(Story storyEntity)
        {
            if (storyEntity == null)
            {
                return new FullStory();
            }

            var fullStoryModel = new FullStory();
            
            MapBaseEntityToModel(fullStoryModel, storyEntity);
            fullStoryModel.StoryHistories = storyEntity.StoryHistories
                .Select(_storyHistoryMapper.MapToModel)
                .OrderByDescending(x => x.CreationDate)
                .ToList();

            return fullStoryModel;
        }

        public StorySimpleModel MapToSimpleModel(Story story)
        {
            if (story == null)
            {
                return new StorySimpleModel();
            }

            var userSimpleModel = new StorySimpleModel
            {
                StoryId = story.Id,
                Title = story.Title,
                SprintId = story.SprintId,
                RecordVersion = story.RecordVersion,
                ColumnType = Enum.Parse<WebAPI.Models.Enums.ColumnType>(story.ColumnType.ToString())
            };

            return userSimpleModel;
        }


        private static void MapBaseEntityToModel(WebAPI.Models.Models.Models.Story model, Story entity)
        {
            model.StoryId = entity.Id;
            model.UserId = entity.UserId;
            model.SprintId = entity.SprintId;
            model.Description = entity.Description;
            model.Estimate = entity.Estimate;
            model.Notes = entity.Notes;
            model.Title = entity.Title;
            model.IsReady = entity.IsReady;
            model.IsBlocked = entity.IsBlocked;
            model.BlockReason = entity.BlockReason;
            model.CreationDate = entity.CreationDate;
            model.RecordVersion = entity.RecordVersion;
            model.StoryPriority = Enum.Parse<WebAPI.Models.Enums.StoryPriority>(entity.StoryPriority.ToString());
            model.RequiredPosition = Enum.Parse<WebAPI.Models.Enums.UserPosition>(entity.RequiredPosition.ToString());
            model.ColumnType = Enum.Parse<WebAPI.Models.Enums.ColumnType>(entity.ColumnType.ToString());
        }
    }
}