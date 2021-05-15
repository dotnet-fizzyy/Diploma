using System;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;
using WebAPI.Core.Interfaces.Mappers;

namespace WebAPI.Presentation.Mappers
{
    public class StoryHistoryMapper : IStoryHistoryMapper
    {
        public StoryHistory MapToEntity(WebAPI.Models.Models.Models.StoryHistory storyHistory)
        {
            if (storyHistory == null)
            {
                return new StoryHistory();
            }
            
            var storyHistoryEntity = new StoryHistory
            {
                Id = storyHistory.StoryHistoryId,
                StoryId = storyHistory.StoryId,
                StoryHistoryAction = Enum.Parse<StoryHistoryAction>(storyHistory.StoryHistoryAction.ToString(), true),
                PreviousValue = storyHistory.PreviousValue,
                CurrentValue = storyHistory.CurrentValue,
                FieldName = storyHistory.FieldName,
                UserName = storyHistory.UserName,
                CreationDate = DateTime.Now,
            };

            return storyHistoryEntity;
        }

        public WebAPI.Models.Models.Models.StoryHistory MapToModel(StoryHistory storyHistory)
        {
            if (storyHistory == null)
            {
                return new WebAPI.Models.Models.Models.StoryHistory();
            }
            
            var storyHistoryModel = new WebAPI.Models.Models.Models.StoryHistory
            {
                StoryHistoryId = storyHistory.Id,
                StoryId = storyHistory.StoryId,
                StoryHistoryAction = Enum.Parse<WebAPI.Models.Enums.StoryHistoryAction>(storyHistory.StoryHistoryAction.ToString(), true),
                PreviousValue = storyHistory.PreviousValue,
                CurrentValue = storyHistory.CurrentValue,
                FieldName = storyHistory.FieldName,
                UserName = storyHistory.UserName,
                CreationDate = storyHistory.CreationDate,
            };

            return storyHistoryModel;
        }
    }
}