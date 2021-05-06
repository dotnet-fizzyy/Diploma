using System;
using System.Collections.Generic;
using WebAPI.Core.Constants;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;
using WebAPI.Core.Interfaces.Aggregators;

namespace WebAPI.Presentation.Aggregators
{
    public class StoryAggregator : IStoryAggregator
    {
        public List<StoryHistory> CreateStoryFromUpdateParts(Story storyEntity, Story storyEntityUpdate, string userName)
        {
            var storyHistory = new List<StoryHistory>();

            if (!string.Equals(storyEntity.Title, storyEntityUpdate.Title, StringComparison.OrdinalIgnoreCase))
            {
                storyHistory.Add(CreateStoryHistory(storyEntity.Id, userName, StoryFields.Title, storyEntity.Title, storyEntityUpdate.Title));
            }

            if (!string.Equals(storyEntity.Notes, storyEntityUpdate.Notes, StringComparison.OrdinalIgnoreCase))
            {
                storyHistory.Add(CreateStoryHistory(storyEntity.Id, userName, StoryFields.Notes, storyEntity.Notes, storyEntityUpdate.Notes));
            }

            if (!string.Equals(storyEntity.Description, storyEntityUpdate.Description, StringComparison.OrdinalIgnoreCase))
            {
                storyHistory.Add(CreateStoryHistory(storyEntity.Id, userName, StoryFields.Description, storyEntity.Description, storyEntityUpdate.Description));
            }
            
            if (storyEntity.Estimate != storyEntityUpdate.Estimate)
            {
                storyHistory.Add(CreateStoryHistory(storyEntity.Id, userName, StoryFields.Estimate, storyEntity.Estimate.ToString(), storyEntityUpdate.Estimate.ToString()));
            }

            if (storyEntity.ColumnType != storyEntityUpdate.ColumnType)
            {
                storyHistory.Add(CreateStoryHistory(storyEntity.Id, userName, StoryFields.ColumnType, storyEntity.ColumnType.ToString(), storyEntityUpdate.ColumnType.ToString()));
            }
            
            if (storyEntity.IsReady != storyEntityUpdate.IsReady)
            {
                storyHistory.Add(CreateStoryHistory(storyEntity.Id, userName, StoryFields.IsReady, storyEntity.IsReady.ToString(), storyEntityUpdate.IsReady.ToString()));
            }

            if (storyEntity.IsBlocked != storyEntityUpdate.IsBlocked)
            {
                storyHistory.Add(CreateStoryHistory(storyEntity.Id, userName, StoryFields.IsBlocked, storyEntity.IsBlocked.ToString(), storyEntityUpdate.IsBlocked.ToString()));
            }
            
            if (!string.Equals(storyEntity.BlockReason, storyEntityUpdate.BlockReason, StringComparison.OrdinalIgnoreCase))
            {
                storyHistory.Add(CreateStoryHistory(storyEntity.Id, userName, StoryFields.BlockReason, storyEntity.BlockReason, storyEntityUpdate.BlockReason));
            }

            if (storyEntity.SprintId != storyEntityUpdate.SprintId)
            {
                storyHistory.Add(CreateStoryHistory(storyEntity.Id, userName, StoryFields.Sprint, storyEntity.SprintId?.ToString(), storyEntityUpdate.SprintId?.ToString()));
            }
            
            if (storyEntity.UserId != storyEntityUpdate.UserId)
            {
                storyHistory.Add(CreateStoryHistory(storyEntity.Id, userName, StoryFields.User, storyEntity.UserId?.ToString(), storyEntityUpdate.UserId?.ToString()));
            }
            
            if (storyEntity.RequiredPosition != storyEntityUpdate.RequiredPosition)
            {
                storyHistory.Add(CreateStoryHistory(storyEntity.Id, userName, StoryFields.RequiredPosition, storyEntity.RequiredPosition.ToString(), storyEntityUpdate.RequiredPosition.ToString()));
            }
            
            if (storyEntity.StoryPriority != storyEntityUpdate.StoryPriority)
            {
                storyHistory.Add(CreateStoryHistory(storyEntity.Id, userName, StoryFields.Priority, storyEntity.StoryPriority.ToString(), storyEntityUpdate.StoryPriority.ToString()));
            }
            
            return storyHistory;
        }

        private static StoryHistory CreateStoryHistory(Guid storyId, string userName, string fieldName, string prevValue, string newValue) => 
            new StoryHistory
            {
                FieldName = fieldName,
                PreviousValue = prevValue,
                CurrentValue = newValue,
                CreationDate = DateTime.UtcNow,
                StoryId = storyId,
                UserName = userName,
                StoryHistoryAction = StoryHistoryAction.Update
        };
    }
}