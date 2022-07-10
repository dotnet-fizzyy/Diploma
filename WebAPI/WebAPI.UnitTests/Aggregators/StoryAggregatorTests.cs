using System;
using System.Collections.Generic;
using WebAPI.Core.Constants;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;
using WebAPI.Presentation.Aggregators;
using Xunit;

namespace WebAPI.UnitTests.Aggregators
{
    public class StoryAggregatorTests
    {
        [Fact]
        public void ShouldCreateStoryHistoryListOnDifferentProperties()
        {
            //Arrange
            const string userName = "TestUserName";
            var firstSprintId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            const string firstSprintName = "FirstSprint";
            var secondSprintId = new Guid("68b9d77a-b7b9-4eb8-8221-2d349e2dffad");
            const string secondSprintName = "SecondSprint";
            var firstUserId = new Guid("4449d77a-b7b9-4eb8-8221-2d349e2df555");
            const string firstUserName = "FirstUser";
            var secondUserId = new Guid("5559d77a-b7b9-4eb8-8221-2d349e2df444");
            const string secondUserName = "SecondUser";
            
            var story = new Story
            {
                Title = "OldTitle",
                Description = "Desc",
                Notes = "OldNotes",
                IsReady = true,
                SprintId = firstSprintId,
                UserId = firstUserId
            };

            var updatedStory = new Story
            {
                Title = "NewTitle",
                Description = "Desc",
                Notes = "NewNotes",
                IsReady = false,
                SprintId = secondSprintId,
                UserId = secondUserId
            };

            var sprints = new List<Sprint>
            {
                new Sprint
                {
                    Id = firstSprintId,
                    SprintName = firstSprintName
                },
                new Sprint
                {
                    Id = secondSprintId,
                    SprintName = secondSprintName
                }
            };

            var users = new List<User>
            {
                new User
                {
                    Id = firstUserId,
                    UserName = firstUserName
                },
                new User
                {
                    Id = secondUserId,
                    UserName = secondUserName
                },
            };


            var expectedResult = new List<StoryHistory>
            {
                new StoryHistory
                {
                    FieldName = StoryFields.Title,
                    PreviousValue = story.Title,
                    CurrentValue = updatedStory.Title
                },
                new StoryHistory
                {
                    FieldName = StoryFields.Notes,
                    PreviousValue = story.Notes,
                    CurrentValue = updatedStory.Notes
                },
                new StoryHistory
                {
                    FieldName = StoryFields.IsReady,
                    PreviousValue = story.IsReady.ToString(),
                    CurrentValue = updatedStory.IsReady.ToString()
                },
                new StoryHistory
                {
                    FieldName = StoryFields.Sprint,
                    PreviousValue = firstSprintName,
                    CurrentValue = secondSprintName
                },
                new StoryHistory
                {
                    FieldName = StoryFields.User,
                    PreviousValue = firstUserName,
                    CurrentValue = secondUserName
                }
            };
            var storyAggregator = new StoryAggregator();

            //Act
            var result = storyAggregator.CreateStoryFromUpdateParts(story, updatedStory, userName, sprints, users);

            //Assert
            Assert.Equal(expectedResult.Count, result.Count);
            Assert.All(result, st =>
            {
                Assert.Equal(StoryHistoryAction.Update, st.StoryHistoryAction);
                Assert.Equal(userName, st.UserName);
            });

            for (var i = 0; i < result.Count; i++)
            {
                Assert.Equal(expectedResult[i].FieldName, result[i].FieldName);
                Assert.Equal(expectedResult[i].PreviousValue, result[i].PreviousValue);
                Assert.Equal(expectedResult[i].CurrentValue, result[i].CurrentValue);
            }
        }

        [Fact]
        public void ShouldReturnEmptyStoryHistoryOnSameStories()
        {
            //Arrange
            const string userName = "TestUserName";
            
            var story = new Story
            {
                Title = "NewTitle",
                Description = "Desc",
                Notes = "NewNotes",
                IsReady = false
            };

            var updatedStory = new Story
            {
                Title = "NewTitle",
                Description = "Desc",
                Notes = "NewNotes",
                IsReady = false
            };

            var storyAggregator = new StoryAggregator();
            
            //Act
            var result = storyAggregator.CreateStoryFromUpdateParts(story, updatedStory, userName, new List<Sprint>(), new List<User>());
            
            //Assert
            Assert.NotNull(result);
            Assert.Empty(result);
        }
    }
}