using System;
using System.Collections.Generic;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;
using WebAPI.Models.Models.Result;
using WebAPI.Models.Models.Simple;
using WebAPI.Presentation.Mappers;
using Xunit;

namespace WebAPI.UnitTests.Mappers
{
    public class StoryMapperTests
    {
        [Fact]
        public void ShouldReturnEmptyModelOnNullEntity()
        {
            //Arrange & Act
            var mappedResult = StoryMapper.Map((Story)null);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyEntityOnNullModel()
        {
            //Arrange & Act
            var mappedResult = StoryMapper.Map((Story)null);

            //Assert
            Assert.NotNull(mappedResult);
        }

        [Fact]
        public void ShouldMapEntityToModel()
        {
            //Arrange
            var storyId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var userId = new Guid("3333238f-87e6-4e86-93fc-ab79b8804444");
            var sprintId = new Guid("1111238f-0000-0000-7777-ab79b8805555");
            const int estimate = 3;
            const int recordVersion = 555;
            const string notes = "Notes";
            const string title = "Title";
            const string description = "Description";
            const bool isReady = false;
            const bool isDeleted = false;
            const bool isBlocked = true;
            const string blockReason = "Reason";
            var creationDate = DateTime.UtcNow;
            
            var storyEntity = new Story
            {
                Id = storyId,
                StoryPriority = StoryPriority.Low,
                ColumnType = ColumnType.InProgress,
                Estimate = estimate,
                Notes = notes,
                Title = title,
                RecordVersion = recordVersion,
                IsDeleted = isDeleted,
                IsReady = isReady,
                IsBlocked = isBlocked,
                BlockReason = blockReason,
                UserId = userId,
                SprintId = sprintId,
                Description = description,
                CreationDate = creationDate
            };

            var storyModel = new Models.Models.Models.Story
            {
                StoryId = storyId,
                StoryPriority = Models.Enums.StoryPriority.Low,
                ColumnType = Models.Enums.ColumnType.InProgress,
                Estimate = estimate,
                Notes = notes,
                Title = title,
                RecordVersion = recordVersion,
                IsDeleted = isDeleted,
                IsReady = isReady,
                IsBlocked = isBlocked,
                BlockReason = blockReason,
                UserId = userId,
                SprintId = sprintId,
                Description = description,
                CreationDate = creationDate
            };
            
            //Act
            var mappedResult = StoryMapper.Map(storyEntity);

            //Assert
            AssertStoryModelProperties(storyModel, mappedResult);
        }
        
        [Fact]
        public void ShouldMapModelToEntity()
        {
            //Arrange
            var storyId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var userId = new Guid("3333238f-87e6-4e86-93fc-ab79b8804444");
            var sprintId = new Guid("1111238f-0000-0000-7777-ab79b8805555");
            const int estimate = 3;
            const int recordVersion = 555;
            const string notes = "Notes";
            const string title = "Title";
            const string description = "Description";
            const bool isReady = false;
            const bool isDeleted = false;
            const bool isBlocked = true;
            const string blockReason = "Reason";
            var creationDate = DateTime.UtcNow;
            
            var storyEntity = new Story
            {
                Id = storyId,
                StoryPriority = StoryPriority.Low,
                ColumnType = ColumnType.InProgress,
                Estimate = estimate,
                Notes = notes,
                Title = title,
                RecordVersion = recordVersion,
                IsDeleted = isDeleted,
                IsReady = isReady,
                IsBlocked = isBlocked,
                BlockReason = blockReason,
                UserId = userId,
                SprintId = sprintId,
                Description = description,
                RequiredPosition = UserPosition.Developer,
                CreationDate = creationDate
            };

            var storyModel = new Models.Models.Models.Story
            {
                StoryId = storyId,
                StoryPriority = Models.Enums.StoryPriority.Low,
                ColumnType = Models.Enums.ColumnType.InProgress,
                Estimate = estimate,
                Notes = notes,
                Title = title,
                RecordVersion = recordVersion,
                IsDeleted = isDeleted,
                IsReady = isReady,
                IsBlocked = isBlocked,
                BlockReason = blockReason,
                UserId = userId,
                SprintId = sprintId,
                Description = description,
                RequiredPosition = Models.Enums.UserPosition.Developer,
                CreationDate = creationDate
            };

            //Act
            var mappedResult = StoryMapper.Map(storyModel);

            //Assert
            Assert.Equal(storyEntity.Id, mappedResult.Id);
            Assert.Equal(storyEntity.UserId, mappedResult.UserId);
            Assert.Equal(storyEntity.SprintId, mappedResult.SprintId);
            Assert.Equal(storyEntity.Title, mappedResult.Title);
            Assert.Equal(storyEntity.Description, mappedResult.Description);
            Assert.Equal(storyEntity.StoryPriority.ToString(), mappedResult.StoryPriority.ToString());
            Assert.Equal(storyEntity.ColumnType.ToString(), mappedResult.ColumnType.ToString());
            Assert.Equal(storyEntity.RequiredPosition.ToString(), mappedResult.RequiredPosition.ToString());
            Assert.Equal(storyEntity.CreationDate, mappedResult.CreationDate);
            Assert.Equal(storyEntity.IsDeleted, mappedResult.IsDeleted);
            Assert.Equal(storyEntity.IsBlocked, mappedResult.IsBlocked);
            Assert.Equal(storyEntity.IsReady, mappedResult.IsReady);
            Assert.Equal(storyEntity.Notes, mappedResult.Notes);
            Assert.Equal(storyEntity.Estimate, mappedResult.Estimate);
            Assert.Equal(storyEntity.RecordVersion, mappedResult.RecordVersion);
        }

        [Fact]
        public void ShouldMapEntityToFullStory()
        {
            //Arrange
            var storyId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var userId = new Guid("3333238f-87e6-4e86-93fc-ab79b8804444");
            var sprintId = new Guid("1111238f-0000-0000-7777-ab79b8805555");
            const int estimate = 3;
            const int recordVersion = 555;
            const string notes = "Notes";
            const string title = "Title";
            const string description = "Description";
            const bool isReady = false;
            const bool isDeleted = false;
            const bool isBlocked = true;
            const string blockReason = "Reason";
            var creationDate = DateTime.UtcNow;

            var storyHistoryId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            
            var storyEntity = new Story
            {
                Id = storyId,
                StoryPriority = StoryPriority.Low,
                ColumnType = ColumnType.InProgress,
                Estimate = estimate,
                Notes = notes,
                Title = title,
                RecordVersion = recordVersion,
                IsDeleted = isDeleted,
                IsReady = isReady,
                IsBlocked = isBlocked,
                BlockReason = blockReason,
                UserId = userId,
                SprintId = sprintId,
                Description = description,
                RequiredPosition = UserPosition.Developer,
                CreationDate = creationDate,
                StoryHistories = new List<StoryHistory>
                {
                    new StoryHistory
                    {
                        Id = storyHistoryId,
                        StoryId = storyId
                    }
                }
            };

            var storyModel = new FullStory
            {
                StoryId = storyId,
                StoryPriority = Models.Enums.StoryPriority.Low,
                ColumnType = Models.Enums.ColumnType.InProgress,
                Estimate = estimate,
                Notes = notes,
                Title = title,
                RecordVersion = recordVersion,
                IsDeleted = isDeleted,
                IsReady = isReady,
                IsBlocked = isBlocked,
                BlockReason = blockReason,
                UserId = userId,
                SprintId = sprintId,
                Description = description,
                RequiredPosition = Models.Enums.UserPosition.Developer,
                CreationDate = creationDate,
                StoryHistories = new List<Models.Models.Models.StoryHistory>
                {
                    new Models.Models.Models.StoryHistory
                    {
                        StoryHistoryId = storyHistoryId,
                        StoryId = storyId
                    }
                },
            };

            //Act
            var mappedResult = StoryMapper.MapToFullModel(storyEntity);

            //Assert
            AssertStoryModelProperties(storyModel, mappedResult);
            
            Assert.Equal(storyModel.StoryHistories.Count, storyModel.StoryHistories.Count);
            Assert.Equal(storyModel.StoryHistories[0].StoryHistoryId, storyModel.StoryHistories[0].StoryHistoryId);
            Assert.Equal(storyModel.StoryHistories[0].StoryId, storyModel.StoryHistories[0].StoryId);
        }

        [Fact]
        public void ShouldMapEntityToSimpleModel()
        {
            //Arrange
            var storyId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var userId = new Guid("3333238f-87e6-4e86-93fc-ab79b8804444");
            var sprintId = new Guid("1111238f-0000-0000-7777-ab79b8805555");
            const int estimate = 3;
            const int recordVersion = 555;
            const string notes = "Notes";
            const string title = "Title";
            const string description = "Description";
            const bool isReady = false;
            const bool isDeleted = false;
            const bool isBlocked = true;
            const string blockReason = "Reason";
            var creationDate = DateTime.UtcNow;
            
            var storyEntity = new Story
            {
                Id = storyId,
                StoryPriority = StoryPriority.Low,
                ColumnType = ColumnType.InProgress,
                Estimate = estimate,
                Notes = notes,
                Title = title,
                RecordVersion = recordVersion,
                IsDeleted = isDeleted,
                IsReady = isReady,
                IsBlocked = isBlocked,
                BlockReason = blockReason,
                UserId = userId,
                SprintId = sprintId,
                Description = description,
                RequiredPosition = UserPosition.Developer,
                CreationDate = creationDate
            };

            var expectedModel = new StorySimpleModel
            {
                StoryId = storyId,
                SprintId = sprintId,
                RecordVersion = recordVersion,
                Title = title,
                ColumnType = Models.Enums.ColumnType.InProgress,
                StoryPriority = Models.Enums.StoryPriority.Low,
                Estimate = estimate,
                IsBlocked = isBlocked,
                IsReady = isReady,
            };
            
            //Act
            var result = StoryMapper.MapToSimpleModel(storyEntity);

            //Assert
            Assert.Equal(expectedModel.StoryId, result.StoryId);
            Assert.Equal(expectedModel.SprintId, result.SprintId);
            Assert.Equal(expectedModel.Title, result.Title);
            Assert.Equal(expectedModel.IsBlocked, result.IsBlocked);
            Assert.Equal(expectedModel.IsReady, result.IsReady);
            Assert.Equal(expectedModel.ColumnType, result.ColumnType);
            Assert.Equal(expectedModel.StoryPriority, result.StoryPriority);
            Assert.Equal(expectedModel.RecordVersion, result.RecordVersion);
        }
        
        [Fact]
        public void ShouldReturnEmptyModelForNullEntityOnMapToSimpleModel()
        {
            //Arrange & Act
            var result = StoryMapper.MapToSimpleModel(null);

            //Assert
            Assert.NotNull(result);
        }

        private static void AssertStoryModelProperties(Models.Models.Models.Story storyModel, Models.Models.Models.Story result)
        {
            Assert.Equal(storyModel.StoryId, result.StoryId);
            Assert.Equal(storyModel.UserId, result.UserId);
            Assert.Equal(storyModel.SprintId, result.SprintId);
            Assert.Equal(storyModel.Title, result.Title);
            Assert.Equal(storyModel.Description, result.Description);
            Assert.Equal(storyModel.StoryPriority.ToString(), result.StoryPriority.ToString());
            Assert.Equal(storyModel.ColumnType.ToString(), result.ColumnType.ToString());
            Assert.Equal(storyModel.CreationDate, result.CreationDate);
            Assert.Equal(storyModel.IsDeleted, result.IsDeleted);
            Assert.Equal(storyModel.IsBlocked, result.IsBlocked);
            Assert.Equal(storyModel.IsReady, result.IsReady);
            Assert.Equal(storyModel.Notes, result.Notes);
            Assert.Equal(storyModel.Estimate, result.Estimate);
            Assert.Equal(storyModel.RecordVersion, result.RecordVersion);
        }
    }
}