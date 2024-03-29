using System;
using System.Linq;

using StoryEntity = WebAPI.Core.Entities.Story;
using StoryModel = WebAPI.Models.Models.Models.Story;
using FullStoryModel = WebAPI.Models.Models.Result.FullStory;
using StorySimpleModel = WebAPI.Models.Models.Simple.StorySimpleModel;
using StoryPriorityEntity = WebAPI.Core.Enums.StoryPriority;
using StoryPriorityModel = WebAPI.Models.Enums.StoryPriority;
using UserPositionEntity = WebAPI.Core.Enums.UserPosition;
using UserPositionModel = WebAPI.Models.Enums.UserPosition;
using ColumnTypeEntity = WebAPI.Core.Enums.ColumnType;
using ColumnTypeModel = WebAPI.Models.Enums.ColumnType;

namespace WebAPI.ApplicationLogic.Mappers
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
                RequiredPosition = Enum.Parse<UserPositionEntity>(story.RequiredPosition.ToString(), ignoreCase: true),
                StoryPriority = Enum.Parse<StoryPriorityEntity>(story.StoryPriority.ToString(), ignoreCase: true),
                ColumnType = Enum.Parse<ColumnTypeEntity>(story.ColumnType.ToString(), ignoreCase: true),
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

        public static FullStoryModel MapToFullModel(StoryEntity storyEntity)
        {
            if (storyEntity == null)
            {
                return new FullStoryModel();
            }

            var fullStoryModel = new FullStoryModel();
            
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
                ColumnType = Enum.Parse<ColumnTypeModel>(story.ColumnType.ToString(), ignoreCase: true),
                StoryPriority = Enum.Parse<StoryPriorityModel>(story.StoryPriority.ToString(), ignoreCase: true),
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
            model.StoryPriority = Enum.Parse<StoryPriorityModel>(entity.StoryPriority.ToString(), ignoreCase: true);
            model.RequiredPosition = Enum.Parse<UserPositionModel>(entity.RequiredPosition.ToString(), ignoreCase: true);
            model.ColumnType = Enum.Parse<ColumnTypeModel>(entity.ColumnType.ToString(), ignoreCase: true);
        }
    }
}