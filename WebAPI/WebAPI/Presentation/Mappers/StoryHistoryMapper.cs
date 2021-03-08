using System;
using System.Collections.Generic;
using System.Linq;
using WebAPI.Core.Enums;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Models;
using StoryHistory = WebAPI.Core.Entities.StoryHistory;

namespace WebAPI.Presentation.Mappers
{
    public class StoryHistoryMapper : IStoryHistoryMapper
    {
        public StoryHistory MapToEntity(Models.Models.StoryHistory storyHistory)
        {
            if (storyHistory == null)
            {
                return new StoryHistory();
            }
            
            var storyHistoryEntity = new StoryHistory
            {
                Id = storyHistory.StoryHistoryId,
                StoryHistoryAction = Enum.Parse<StoryHistoryAction>(storyHistory.StoryHistoryAction.ToString(), true),
                PreviousValue = storyHistory.PreviousValue,
                CurrentValue = storyHistory.CurrentValue,
                FieldName = storyHistory.FieldName,
                UserId = storyHistory.UserId,
                RecordVersion = storyHistory.RecordVersion,
                CreationDate = DateTime.Now,
            };

            return storyHistoryEntity;
        }

        public Models.Models.StoryHistory MapToModel(StoryHistory storyHistory)
        {
            if (storyHistory == null)
            {
                return new Models.Models.StoryHistory();
            }
            
            var storyHistoryModel = new Models.Models.StoryHistory
            {
                StoryHistoryId = storyHistory.Id,
                StoryHistoryAction = Enum.Parse<Models.Enums.StoryHistoryAction>(storyHistory.StoryHistoryAction.ToString(), true),
                PreviousValue = storyHistory.PreviousValue,
                CurrentValue = storyHistory.CurrentValue,
                FieldName = storyHistory.FieldName,
                RecordVersion = storyHistory.RecordVersion,
                UserId = storyHistory.UserId,
                CreationDate = storyHistory.CreationDate,
            };

            return storyHistoryModel;
        }

        public List<StoryHistory> MapToStoryEntityParts(StoryUpdate storyUpdate, Guid userId)
        {
            var storyHistories = new List<StoryHistory>();

            if (storyUpdate == null)
            {
                return storyHistories;
            }

            storyHistories.AddRange(storyUpdate.Parts.Select(part => new StoryHistory
            {
                StoryId = storyUpdate.Story.StoryId,
                UserId = userId,
                StoryHistoryAction = StoryHistoryAction.Update,
                FieldName = part.Field,
                PreviousValue = part.PreviousValue,
                CurrentValue = part.NewValue,
                CreationDate = DateTime.Now,
            }));

            return storyHistories;
        }
    }
}