using System;

using StoryHistoryEntity = WebAPI.Core.Entities.StoryHistory;
using StoryHistoryModel = WebAPI.Models.Models.Models.StoryHistory;
using StoryHistoryActionModel = WebAPI.Models.Enums.StoryHistoryAction;

namespace WebAPI.Presentation.Mappers
{
    public static class StoryHistoryMapper
    {
        public static StoryHistoryModel Map(StoryHistoryEntity storyHistory)
        {
            if (storyHistory == null)
            {
                return new StoryHistoryModel();
            }
            
            var storyHistoryModel = new StoryHistoryModel
            {
                StoryHistoryId = storyHistory.Id,
                StoryId = storyHistory.StoryId,
                StoryHistoryAction = Enum.Parse<StoryHistoryActionModel>(
                                    storyHistory.StoryHistoryAction.ToString(),
                                         ignoreCase: true),
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