using System;
using System.Collections.Generic;
using System.Linq;
using FakeItEasy;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Result;
using WebAPI.Presentation.Mappers;
using Xunit;

namespace WebAPI.UnitTests.Mappers
{
    public class StoryMapperTests
    {
        [Fact]
        public void ShouldReturnEmptyModelOnNullEntity()
        {
            //Arrange
            var storyHistoryMapper = A.Fake<IStoryHistoryMapper>();

            Story storyEntity = null;
            
            //Act
            var storyMapper = new StoryMapper(storyHistoryMapper);
            var mappedResult = storyMapper.MapToModel(storyEntity);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyEntityOnNullModel()
        {
            //Arrange
            var storyHistoryMapper = A.Fake<IStoryHistoryMapper>();

            Models.Models.Story storyModel = null;
            
            //Act
            var storyMapper = new StoryMapper(storyHistoryMapper);
            var mappedResult = storyMapper. MapToEntity(storyModel);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyFullModelOnNullEntity()
        {
            //Arrange
            var storyHistoryMapper = A.Fake<IStoryHistoryMapper>();

            Story storyEntity = null;
            
            //Act
            var storyMapper = new StoryMapper(storyHistoryMapper);
            var mappedResult = storyMapper.MapToFullModel(storyEntity);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldMapEntityToModel()
        {
            //Arrange
            var storyHistoryMapper = A.Fake<IStoryHistoryMapper>();

            var storyId = new Guid();
            var userId = new Guid();
            var sprintId = new Guid();
            
            var storyEntity = new Story
            {
                StoryId = storyId,
                StoryPriority = StoryPriority.Low,
                ColumnType = ColumnType.InProgress,
                Estimate = 3,
                Notes = "Notes",
                Title = "Title",
                RecordVersion = 1234,
                IsDeleted = false,
                IsReady = false,
                IsBlocked = true,
                BlockReason = "Some reason",
                UserId = userId,
                SprintId = sprintId,
                Description = "Description",
                CreationDate = new DateTime(2020, 11, 11)
            };

            var storyModel = new Models.Models.Story
            {
                StoryId = storyId,
                StoryPriority = Models.Enums.StoryPriority.Low,
                ColumnType = Models.Enums.ColumnType.InProgress,
                Estimate = 3,
                Notes = "Notes",
                Title = "Title",
                RecordVersion = 1234,
                IsDeleted = false,
                IsReady = false,
                IsBlocked = true,
                BlockReason = "Some reason",
                UserId = userId,
                SprintId = sprintId,
                Description = "Description",
                CreationDate = new DateTime(2020, 11, 11)
            };
            
            //Act
            var storyMapper = new StoryMapper(storyHistoryMapper);
            var mappedResult = storyMapper.MapToModel(storyEntity);

            //Assert
            Assert.Equal(storyModel.StoryId, mappedResult.StoryId);
            Assert.Equal(storyModel.UserId, mappedResult.UserId);
            Assert.Equal(storyModel.SprintId, mappedResult.SprintId);
            Assert.Equal(storyModel.Title, mappedResult.Title);
            Assert.Equal(storyModel.Description, mappedResult.Description);
            Assert.Equal(storyModel.StoryPriority.ToString(), mappedResult.StoryPriority.ToString());
            Assert.Equal(storyModel.ColumnType.ToString(), mappedResult.ColumnType.ToString());
            Assert.Equal(storyModel.CreationDate, mappedResult.CreationDate);
            Assert.Equal(storyModel.IsDeleted, mappedResult.IsDeleted);
            Assert.Equal(storyModel.IsBlocked, mappedResult.IsBlocked);
            Assert.Equal(storyModel.IsReady, mappedResult.IsReady);
            Assert.Equal(storyModel.Notes, mappedResult.Notes);
            Assert.Equal(storyModel.Estimate, mappedResult.Estimate);
            Assert.Equal(storyModel.RecordVersion, mappedResult.RecordVersion);
        }
        
        [Fact]
        public void ShouldMapModelToEntity()
        {
            //Arrange
            var storyHistoryMapper = A.Fake<IStoryHistoryMapper>();

            var storyId = new Guid();
            var userId = new Guid();
            var sprintId = new Guid();
            
            var storyEntity = new Story
            {
                StoryId = storyId,
                StoryPriority = StoryPriority.High,
                ColumnType = ColumnType.InReview,
                Estimate = 5,
                Notes = "Too many notes",
                Title = "Title",
                RecordVersion = 12345,
                IsDeleted = false,
                IsReady = false,
                IsBlocked = true,
                BlockReason = "Some reason",
                UserId = userId,
                SprintId = sprintId,
                Description = "Description",
                CreationDate = new DateTime(2020, 11, 11)
            };

            var storyModel = new Models.Models.Story
            {
                StoryId = storyId,
                StoryPriority = Models.Enums.StoryPriority.High,
                ColumnType = Models.Enums.ColumnType.InReview,
                Estimate = 5,
                Notes = "Too many notes",
                Title = "Title",
                RecordVersion = 12345,
                IsDeleted = false,
                IsReady = false,
                IsBlocked = true,
                BlockReason = "Some reason",
                UserId = userId,
                SprintId = sprintId,
                Description = "Description",
                CreationDate = new DateTime(2020, 11, 11)
            };
            
            //Act
            var storyMapper = new StoryMapper(storyHistoryMapper);
            var mappedResult = storyMapper.MapToEntity(storyModel);

            //Assert
            Assert.Equal(storyEntity.StoryId, mappedResult.StoryId);
            Assert.Equal(storyEntity.UserId, mappedResult.UserId);
            Assert.Equal(storyEntity.SprintId, mappedResult.SprintId);
            Assert.Equal(storyEntity.Title, mappedResult.Title);
            Assert.Equal(storyEntity.Description, mappedResult.Description);
            Assert.Equal(storyEntity.StoryPriority.ToString(), mappedResult.StoryPriority.ToString());
            Assert.Equal(storyEntity.ColumnType.ToString(), mappedResult.ColumnType.ToString());
            Assert.Equal(storyEntity.CreationDate, mappedResult.CreationDate);
            Assert.Equal(storyEntity.IsDeleted, mappedResult.IsDeleted);
            Assert.Equal(storyEntity.IsBlocked, mappedResult.IsBlocked);
            Assert.Equal(storyEntity.IsReady, mappedResult.IsReady);
            Assert.Equal(storyEntity.Notes, mappedResult.Notes);
            Assert.Equal(storyEntity.Estimate, mappedResult.Estimate);
            Assert.Equal(storyEntity.RecordVersion, mappedResult.RecordVersion);
        }

        [Fact]
        public void ShouldMapEntityToFullModel()
        {
            //Arrange
            var storyHistoryMapper = A.Fake<IStoryHistoryMapper>();

            var storyId = new Guid();
            var userId = new Guid();
            var sprintId = new Guid();
            var storyHistoryId = new Guid();
            
            var storyEntity = new Story
            {
                StoryId = storyId,
                StoryPriority = StoryPriority.High,
                ColumnType = ColumnType.InReview,
                Estimate = 5,
                Notes = "Too many notes",
                Title = "Title",
                RecordVersion = 12345,
                IsDeleted = false,
                IsReady = false,
                IsBlocked = true,
                BlockReason = "Some reason",
                UserId = userId,
                SprintId = sprintId,
                Description = "Description",
                CreationDate = new DateTime(2020, 11, 11),
                StoryHistories = new List<StoryHistory>
                {
                    new StoryHistory
                    {
                        StoryHistoryId = storyHistoryId,
                        StoryHistoryAction = StoryHistoryAction.Add,
                        CurrentValue = "new_value",
                        FieldName = "field",
                        RecordVersion = 12345
                    }
                }
            };

            var fullStoryModel = new FullStory
            {
                StoryId = storyId,
                StoryPriority = Models.Enums.StoryPriority.High,
                ColumnType = Models.Enums.ColumnType.InReview,
                Estimate = 5,
                Notes = "Too many notes",
                Title = "Title",
                RecordVersion = 12345,
                IsDeleted = false,
                IsReady = false,
                IsBlocked = true,
                BlockReason = "Some reason",
                UserId = userId,
                SprintId = sprintId,
                Description = "Description",
                CreationDate = new DateTime(2020, 11, 11),
                StoryHistories = new List<Models.Models.StoryHistory>
                {
                    new Models.Models.StoryHistory
                    {
                        StoryHistoryId = storyHistoryId,
                        StoryHistoryAction = Models.Enums.StoryHistoryAction.Add,
                        CurrentValue = "new_value",
                        FieldName = "field",
                        RecordVersion = 12345
                    }
                }
            };
            
            //Act
            A.CallTo(() => storyHistoryMapper.MapToModel(storyEntity.StoryHistories.First()))
                .Returns(fullStoryModel.StoryHistories.First());
            
            var storyMapper = new StoryMapper(storyHistoryMapper);
            var mappedResult = storyMapper.MapToFullModel(storyEntity);
            
            
            //Assert
            Assert.Equal(storyEntity.StoryId, mappedResult.StoryId);
            Assert.Equal(storyEntity.UserId, mappedResult.UserId);
            Assert.Equal(storyEntity.SprintId, mappedResult.SprintId);
            Assert.Equal(storyEntity.Title, mappedResult.Title);
            Assert.Equal(storyEntity.Description, mappedResult.Description);
            Assert.Equal(storyEntity.StoryPriority.ToString(), mappedResult.StoryPriority.ToString());
            Assert.Equal(storyEntity.ColumnType.ToString(), mappedResult.ColumnType.ToString());
            Assert.Equal(storyEntity.CreationDate, mappedResult.CreationDate);
            Assert.Equal(storyEntity.IsDeleted, mappedResult.IsDeleted);
            Assert.Equal(storyEntity.IsBlocked, mappedResult.IsBlocked);
            Assert.Equal(storyEntity.IsReady, mappedResult.IsReady);
            Assert.Equal(storyEntity.Notes, mappedResult.Notes);
            Assert.Equal(storyEntity.Estimate, mappedResult.Estimate);
            Assert.Equal(storyEntity.RecordVersion, mappedResult.RecordVersion);
            Assert.All(mappedResult.StoryHistories, history =>
            {
                Assert.Equal(storyEntity.StoryHistories.First().StoryHistoryId, history.StoryHistoryId);
                Assert.Equal(storyEntity.StoryHistories.First().CurrentValue, history.CurrentValue);
                Assert.Equal(storyEntity.StoryHistories.First().StoryHistoryAction.ToString(), history.StoryHistoryAction.ToString());
                Assert.Equal(storyEntity.StoryHistories.First().FieldName, history.FieldName);
                Assert.Equal(storyEntity.StoryHistories.First().RecordVersion, history.RecordVersion);
            });

            A.CallTo(() => storyHistoryMapper.MapToModel(storyEntity.StoryHistories.First()))
                .MustHaveHappened();
        }
    }
}