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
    }
}