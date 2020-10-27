using System;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;
using WebAPI.Core.Interfaces.Mappers;

namespace WebAPI.Presentation.Mappers
{
    public class StoryHistoryMapper : IStoryHistoryMapper
    {
        public StoryHistory MapToEntity(Models.Models.StoryHistory storyHistory)
        {
            var storyHistoryEntity = new StoryHistory
            {
                StoryHistoryId = storyHistory.StoryHistoryId,
                StoryHistoryAction = Enum.Parse<StoryHistoryAction>(storyHistory.StoryHistoryAction, true),
                PreviousValue = storyHistory.PreviousValue,
                CurrentValue = storyHistory.CurrentValue,
                FieldName = storyHistory.FieldName,
            };

            return storyHistoryEntity;
        }

        public Models.Models.StoryHistory MapToModel(StoryHistory storyHistory)
        {
            var storyHistoryModel = new Models.Models.StoryHistory
            {
                StoryHistoryId = storyHistory.StoryHistoryId,
                StoryHistoryAction = storyHistory.StoryHistoryAction.ToString(),
                PreviousValue = storyHistory.PreviousValue,
                CurrentValue = storyHistory.CurrentValue,
                FieldName = storyHistory.FieldName,
            };

            return storyHistoryModel;
        }
    }
}