using System;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;
using WebAPI.Core.Interfaces.Mappers;

namespace WebAPI.Presentation.Mappers
{
    public class StoryHistoryMapper : IStoryHistoryMapper
    {
        public StoryHistory MapToEntity(Models.Models.Models.StoryHistory storyHistory)
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
                CreationDate = DateTime.Now,
            };

            return storyHistoryEntity;
        }

        public Models.Models.Models.StoryHistory MapToModel(StoryHistory storyHistory)
        {
            if (storyHistory == null)
            {
                return new Models.Models.Models.StoryHistory();
            }
            
            var storyHistoryModel = new Models.Models.Models.StoryHistory
            {
                StoryHistoryId = storyHistory.Id,
                StoryHistoryAction = Enum.Parse<Models.Enums.StoryHistoryAction>(storyHistory.StoryHistoryAction.ToString(), true),
                PreviousValue = storyHistory.PreviousValue,
                CurrentValue = storyHistory.CurrentValue,
                FieldName = storyHistory.FieldName,
                UserId = storyHistory.UserId,
                CreationDate = storyHistory.CreationDate,
            };

            return storyHistoryModel;
        }
    }
}