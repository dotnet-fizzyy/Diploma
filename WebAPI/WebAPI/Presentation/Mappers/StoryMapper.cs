using System;
using System.Linq;
using WebAPI.Models.Models.Result;
using WebAPI.Models.Models.Simple;

using StoryEntity = WebAPI.Core.Entities.Story;
using StoryModel = WebAPI.Models.Models.Models.Story;
using StoryPriorityEntity = WebAPI.Core.Enums.StoryPriority;
using StoryPriorityModel = WebAPI.Models.Enums.StoryPriority;
using UserPositionEntity = WebAPI.Core.Enums.UserPosition;
using UserPositionModel = WebAPI.Models.Enums.UserPosition;
using ColumnTypeEntity = WebAPI.Core.Enums.ColumnType;
using ColumnTypeModel = WebAPI.Models.Enums.ColumnType;

namespace WebAPI.Presentation.Mappers
{
    public static class StoryMapper
    {
        public static StoryEntity Map(StoryModel story)
        {
            if (story == null)
            {
                return new StoryEntity();
            }
            
            var storyEntity = new StoryEntity
            {
                Id = story.StoryId,
                UserId = story.UserId,
                TeamId = story.TeamId,
                SprintId = story.SprintId,
                Description = story.Description,
                Estimate = story.Estimate,
                Notes = story.Notes,
                Title = story.Title,
                IsReady = story.IsReady,
                IsBlocked = story.IsBlocked,
                BlockReason = story.BlockReason,
                CreationDate = story.CreationDate,
                RequiredPosition = Enum.Parse<UserPositionEntity>(story.RequiredPosition.ToString()),
                StoryPriority = Enum.Parse<StoryPriorityEntity>(story.StoryPriority.ToString()),
                ColumnType = Enum.Parse<ColumnTypeEntity>(story.ColumnType.ToString()),
                IsDeleted = story.IsDeleted,
                RecordVersion = story.RecordVersion,
            };
            
            return storyEntity;
        }

        public static StoryModel Map(StoryEntity storyEntity)
        {
            if (storyEntity == null)
            {
                return new StoryModel();
            }

            var storyModel = new StoryModel();
            
            MapBaseEntityToModel(storyModel, storyEntity);

            return storyModel;
        }

        public static FullStory MapToFullModel(StoryEntity storyEntity)
        {
            if (storyEntity == null)
            {
                return new FullStory();
            }

            var fullStoryModel = new FullStory();
            
            MapBaseEntityToModel(fullStoryModel, storyEntity);

            fullStoryModel.StoryHistories = storyEntity.StoryHistories
                .Select(StoryHistoryMapper.Map)
                .OrderByDescending(storyHistory => storyHistory.CreationDate)
                .ToList();

            return fullStoryModel;
        }

        public static StorySimpleModel MapToSimpleModel(StoryEntity story)
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
                ColumnType = Enum.Parse<ColumnTypeModel>(story.ColumnType.ToString()),
                StoryPriority = Enum.Parse<StoryPriorityModel>(story.StoryPriority.ToString()),
                IsReady = story.IsReady,
                IsBlocked = story.IsBlocked,
                Estimate = story.Estimate,
            };

            return userSimpleModel;
        }


        private static void MapBaseEntityToModel(StoryModel model, StoryEntity entity)
        {
            model.StoryId = entity.Id;
            model.UserId = entity.UserId;
            model.TeamId = entity.TeamId;
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
            model.StoryPriority = Enum.Parse<StoryPriorityModel>(entity.StoryPriority.ToString());
            model.RequiredPosition = Enum.Parse<UserPositionModel>(entity.RequiredPosition.ToString());
            model.ColumnType = Enum.Parse<ColumnTypeModel>(entity.ColumnType.ToString());
        }
    }
}