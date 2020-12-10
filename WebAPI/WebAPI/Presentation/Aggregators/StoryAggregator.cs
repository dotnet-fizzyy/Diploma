using System;
using WebAPI.Core.Constants;
using WebAPI.Core.Enums;
using WebAPI.Core.Interfaces.Aggregators;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Models;
using Story = WebAPI.Core.Entities.Story;

namespace WebAPI.Presentation.Aggregators
{
    public class StoryAggregator : IStoryAggregator
    {
        private readonly IStoryMapper _storyMapper;

        public StoryAggregator(IStoryMapper storyMapper)
        {
            _storyMapper = storyMapper;
        }
        
        public Story CreateStoryFromUpdateParts(StoryUpdate storyUpdate)
        {
            var story = _storyMapper.MapToEntity(storyUpdate.Story);

            foreach (var part in storyUpdate.Parts)
            {
                switch (part.Field)
                {
                    case StoryFields.Title:
                        story.Title = part.NewValue;
                        break;
                    case StoryFields.Notes:
                        story.Notes = part.NewValue;
                        break;
                    case StoryFields.Estimate:
                        story.Estimate = int.Parse(part.NewValue);
                        break;
                    case StoryFields.Description:
                        story.Description = part.NewValue;
                        break;
                    case StoryFields.Sprint:
                        story.SprintId = Guid.Parse(part.NewValue);
                        break;
                    case StoryFields.BlockReason:
                        story.BlockReason = part.NewValue;
                        break;
                    case StoryFields.ColumnType:
                        story.ColumnType = Enum.Parse<ColumnType>(part.NewValue, true);
                        break;
                    case StoryFields.IsBlocked:
                        story.IsBlocked = true;
                        break;
                    case StoryFields.IsReady:
                        story.IsBlocked = true;
                        break;
                    case StoryFields.User:
                        story.UserId = Guid.Parse(part.NewValue);
                        break;
                    case StoryFields.Priority:
                        story.StoryPriority =  Enum.Parse<StoryPriority>(part.NewValue, true);
                        break;
                    default:
                        continue;
                }
            }

            return story;
        }
    }
}