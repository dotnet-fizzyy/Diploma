using System;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;

namespace WebAPI.ApplicationLogic.Handlers
{
    public static class StoryHistoryGenerator
    {
        public static StoryHistory GetStoryHistoryForCreation(string userName, Guid storyId)
        {
            return new StoryHistory
            {
                StoryHistoryAction = StoryHistoryAction.Add,
                UserName = userName,
                CurrentValue = string.Empty,
                PreviousValue = string.Empty,
                FieldName = string.Empty,
                StoryId = storyId,
                CreationDate = DateTime.Now,
            };
        }
        
        public static StoryHistory GetStoryHistoryForUpdate(string userName, Guid storyId, string fieldName, string prevValue, string newValue)
        {
            return new StoryHistory
            {
                StoryHistoryAction = StoryHistoryAction.Update,
                UserName = userName,
                CurrentValue = newValue,
                PreviousValue = prevValue,
                FieldName = fieldName,
                StoryId = storyId,
                CreationDate = DateTime.Now,
            };
        }
    }
}