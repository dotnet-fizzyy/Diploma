using System;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;

namespace WebAPI.ApplicationLogic
{
    public class StoryHistoryGenerator
    {
        public static StoryHistory GetStoryHistoryForCreation(Guid userId, Guid storyId)
        {
            return new StoryHistory
            {
                StoryHistoryAction = StoryHistoryAction.Add,
                UserId = userId,
                CurrentValue = string.Empty,
                PreviousValue = string.Empty,
                FieldName = string.Empty,
                StoryId = storyId,
            };
        }

        public static StoryHistory GetStoryHistoryForUpdate(Guid userId, Story story)
        {
            return new StoryHistory
            {
                StoryHistoryAction = StoryHistoryAction.Update,
                UserId = userId,
                CurrentValue = string.Empty,
                PreviousValue = string.Empty,
                FieldName = string.Empty,
                StoryId = story.StoryId,
            };
        }
    }
}