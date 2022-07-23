using System;
using System.Collections.Generic;
using System.Linq;
using WebAPI.Core.Constants;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;

namespace WebAPI.ApplicationLogic.Aggregators
{
    public class StoryAggregator
    {
        private readonly List<StoryHistory> _storyHistory = new List<StoryHistory>();
        
        public List<StoryHistory> CreateStoryFromUpdateParts(
            Story originalStory,
            Story storyToUpdate,
            string username,
            IList<Sprint> sprints,
            IList<User> users)
        {
            CompareTitle(originalStory, storyToUpdate, username);
            CompareNotes(originalStory, storyToUpdate, username);
            CompareDescription(originalStory, storyToUpdate, username);
            CompareEstimation(originalStory, storyToUpdate, username);
            CompareColumnType(originalStory, storyToUpdate, username);
            CompareRequiredPositionToWork(originalStory, storyToUpdate, username);
            CompareReadyStatus(originalStory, storyToUpdate, username);
            CompareBlockStatus(originalStory, storyToUpdate, username);
            CompareBlockDescription(originalStory, storyToUpdate, username);
            CompareSprints(originalStory, storyToUpdate, username, sprints);
            CompareAssignee(originalStory, storyToUpdate, username, users);
            CompareStoryPriority(originalStory, storyToUpdate, username);

            return _storyHistory;
        }


        private void CompareTitle(Story originalStory, Story storyToUpdate, string username)
        {
            var isTitleDifferent = !string.Equals(
                originalStory.Title,
                storyToUpdate.Title,
                StringComparison.OrdinalIgnoreCase);

            if (isTitleDifferent)
            {
                _storyHistory.Add(CreateStoryHistory(
                    originalStory.Id,
                    username,
                    StoryFields.Title, 
                    originalStory.Title, 
                    storyToUpdate.Title)
                );
            }
        }
        
        private void CompareNotes(Story originalStory, Story storyToUpdate, string username)
        {
            var areNotesDifferent = !string.Equals(
                originalStory.Notes,
                storyToUpdate.Notes,
                StringComparison.OrdinalIgnoreCase);

            if (areNotesDifferent)
            {
                _storyHistory.Add(CreateStoryHistory(
                    originalStory.Id,
                    username,
                    StoryFields.Notes,
                    originalStory.Notes,
                    storyToUpdate.Notes)
                );
            }
        }
        
        private void CompareDescription(Story originalStory, Story storyToUpdate, string username)
        {
            var isDescriptionDifferent = !string.Equals(
                originalStory.Description,
                storyToUpdate.Description, 
                StringComparison.OrdinalIgnoreCase);

            if (isDescriptionDifferent)
            {
                _storyHistory.Add(CreateStoryHistory(
                    originalStory.Id,
                    username,
                    StoryFields.Description, 
                    originalStory.Description, 
                    storyToUpdate.Description)
                );
            }
        }
        
        private void CompareEstimation(Story originalStory, Story storyToUpdate, string username)
        {
            var isEstimationDifferent = originalStory.Estimate != storyToUpdate.Estimate;
            
            if (isEstimationDifferent)
            {
                _storyHistory.Add(CreateStoryHistory(
                    originalStory.Id,
                    username, 
                    StoryFields.Estimate,
                    originalStory.Estimate.ToString(),
                    storyToUpdate.Estimate.ToString())
                );
            }
        }
        
        private void CompareColumnType(Story originalStory, Story storyToUpdate, string username)
        {
            var isColumnTypeDifferent = originalStory.ColumnType != storyToUpdate.ColumnType;

            if (isColumnTypeDifferent)
            {
                _storyHistory.Add(CreateStoryHistory(
                    originalStory.Id,
                    username, 
                    StoryFields.ColumnType, 
                    originalStory.ColumnType.ToString(), 
                    storyToUpdate.ColumnType.ToString())
                );
            }
        }
        
        private void CompareSprints(
            Story originalStory,
            Story storyToUpdate,
            string username,
            IList<Sprint> sprints)
        {
            var isSprintDifferent = originalStory.SprintId != storyToUpdate.SprintId;

            if (isSprintDifferent)
            {
                var previousSprintName = sprints.FirstOrDefault(x => x.Id == originalStory.SprintId)?.SprintName;
                var newSprintName = sprints.FirstOrDefault(x => x.Id == storyToUpdate.SprintId)?.SprintName;

                _storyHistory.Add(CreateStoryHistory(
                        originalStory.Id, 
                        username, 
                        StoryFields.Sprint, 
                        previousSprintName, 
                        newSprintName
                    )
                );
            }
        }
        
        private void CompareAssignee(
            Story originalStory,
            Story storyToUpdate,
            string username,
            IList<User> users)
        {
            var isRequiredPositionDifferent = originalStory.UserId != storyToUpdate.UserId;

            if (isRequiredPositionDifferent)
            {
                var previousUsername = users.FirstOrDefault(x => x.Id == originalStory.UserId)?.UserName;
                var newUsername = users.FirstOrDefault(x => x.Id == storyToUpdate.UserId)?.UserName;
                
                _storyHistory.Add(CreateStoryHistory(
                        originalStory.Id, 
                        username, 
                        StoryFields.User, 
                        previousUsername, 
                        newUsername
                    )
                );
            }
        }
        
        private void CompareRequiredPositionToWork(Story originalStory, Story storyToUpdate, string username)
        {
            var isRequiredPositionDifferent = originalStory.RequiredPosition != storyToUpdate.RequiredPosition;

            if (isRequiredPositionDifferent)
            {
                _storyHistory.Add(CreateStoryHistory(
                    originalStory.Id,
                    username, 
                    StoryFields.RequiredPosition, 
                    originalStory.RequiredPosition.ToString(), 
                    storyToUpdate.RequiredPosition.ToString())
                );
            }
        }
        
        private void CompareReadyStatus(Story originalStory, Story storyToUpdate, string username)
        {
            var isRequiredPositionDifferent = originalStory.IsReady != storyToUpdate.IsReady;

            if (isRequiredPositionDifferent)
            {
                _storyHistory.Add(CreateStoryHistory(
                    originalStory.Id,
                    username, 
                    StoryFields.IsReady, 
                    originalStory.IsReady.ToString(), 
                    storyToUpdate.IsReady.ToString())
                );
            }
        }

        private void CompareBlockStatus(Story originalStory, Story storyToUpdate, string username)
        {
            var isBlockStatusDifferent = originalStory.IsBlocked != storyToUpdate.IsBlocked;

            if (isBlockStatusDifferent)
            {
                _storyHistory.Add(CreateStoryHistory(
                    originalStory.Id,
                    username, 
                    StoryFields.IsBlocked, 
                    originalStory.IsBlocked.ToString(), 
                    storyToUpdate.IsBlocked.ToString())
                );
            }
        }
        
        private void CompareBlockDescription(Story originalStory, Story storyToUpdate, string username)
        {
            var isBlockReasonDifferent = !string.Equals(
                                        originalStory.BlockReason, 
                                        storyToUpdate.BlockReason,
                                        StringComparison.OrdinalIgnoreCase);

            if (isBlockReasonDifferent)
            {
                _storyHistory.Add(CreateStoryHistory(
                    originalStory.Id,
                    username, 
                    StoryFields.BlockReason, 
                    originalStory.BlockReason, 
                    storyToUpdate.BlockReason)
                );
            }
        }

        private void CompareStoryPriority(Story originalStory, Story storyToUpdate, string username)
        {
            var isStoryPriorityDifferent = originalStory.StoryPriority != storyToUpdate.StoryPriority;

            if (isStoryPriorityDifferent)
            {
                _storyHistory.Add(CreateStoryHistory(
                    originalStory.Id,
                    username, 
                    StoryFields.Priority, 
                    originalStory.StoryPriority.ToString(), 
                    storyToUpdate.StoryPriority.ToString())
                );
            }
        }
        
        private static StoryHistory CreateStoryHistory(
            Guid storyId,
            string userName,
            string fieldName,
            string prevValue,
            string newValue
        ) => 
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