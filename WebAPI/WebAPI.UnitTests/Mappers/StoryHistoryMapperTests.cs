using System;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;
using WebAPI.Presentation.Mappers;
using Xunit;

namespace WebAPI.UnitTests.Mappers
{
    public class StoryHistoryMapperTests
    {
        [Fact]
        public void ShouldReturnEmptyModelOnNullEntity()
        {
            //Arrange
            StoryHistory storyHistoryEntity = null;

            //Act
            var storyHistoryMapper = new StoryHistoryMapper();
            var mappedResult = storyHistoryMapper.MapToModel(storyHistoryEntity);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyEntityOnNullModel()
        {
            //Arrange
            Models.Models.StoryHistory storyHistoryModel = null;

            //Act
            var storyHistoryMapper = new StoryHistoryMapper();
            var mappedResult = storyHistoryMapper.MapToEntity(storyHistoryModel);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldMapEntityToModel()
        {
            //Arrange
            var storyHistoryId = new Guid();
            var storyId = new Guid();
            var userId = new Guid();
            
            var storyHistoryEntity = new StoryHistory
            {
                Id = storyHistoryId,
                StoryHistoryAction = StoryHistoryAction.Add,
                StoryId = storyId,
                CurrentValue = "Current",
                PreviousValue = string.Empty,
                RecordVersion = 111,
                FieldName = "Field",
                UserId = userId
            };
            
            var storyHistoryModel = new Models.Models.StoryHistory
            {
                StoryHistoryId = storyHistoryId,
                StoryHistoryAction = Models.Enums.StoryHistoryAction.Add,
                CurrentValue = "Current",
                PreviousValue = string.Empty,
                RecordVersion = 111,
                FieldName = "Field",
                UserId = userId,
            };

            //Act
            var storyHistoryMapper = new StoryHistoryMapper();
            var mappedResult = storyHistoryMapper.MapToModel(storyHistoryEntity);

            //Assert
            Assert.Equal(storyHistoryModel.StoryHistoryId, mappedResult.StoryHistoryId);
            Assert.Equal(storyHistoryModel.StoryHistoryAction.ToString(), mappedResult.StoryHistoryAction.ToString());
            Assert.Equal(storyHistoryModel.UserId, mappedResult.UserId);
            Assert.Equal(storyHistoryModel.CurrentValue, mappedResult.CurrentValue);
            Assert.Equal(storyHistoryModel.RecordVersion, mappedResult.RecordVersion);
            Assert.Equal(storyHistoryModel.FieldName, mappedResult.FieldName);
            Assert.Equal(storyHistoryModel.PreviousValue, mappedResult.PreviousValue);
        }
        
        [Fact]
        public void ShouldMapModelToEntity()
        {
            //Arrange
            var storyHistoryId = new Guid();
            var storyId = new Guid();
            var userId = new Guid();
            
            var storyHistoryEntity = new StoryHistory
            {
                Id = storyHistoryId,
                StoryHistoryAction = StoryHistoryAction.Update,
                StoryId = storyId,
                CurrentValue = "Some value",
                PreviousValue = string.Empty,
                RecordVersion = 122,
                FieldName = "Some Field",
                UserId = userId
            };
            
            var storyHistoryModel = new Models.Models.StoryHistory
            {
                StoryHistoryId = storyHistoryId,
                StoryHistoryAction = Models.Enums.StoryHistoryAction.Update,
                CurrentValue = "Some value",
                PreviousValue = string.Empty,
                RecordVersion = 122,
                FieldName = "Some Field",
                UserId = userId,
            };

            //Act
            var storyHistoryMapper = new StoryHistoryMapper();
            var mappedResult = storyHistoryMapper.MapToModel(storyHistoryEntity);

            //Assert
            Assert.Equal(storyHistoryModel.StoryHistoryId, mappedResult.StoryHistoryId);
            Assert.Equal(storyHistoryModel.StoryHistoryAction.ToString(), mappedResult.StoryHistoryAction.ToString());
            Assert.Equal(storyHistoryModel.UserId, mappedResult.UserId);
            Assert.Equal(storyHistoryModel.CurrentValue, mappedResult.CurrentValue);
            Assert.Equal(storyHistoryModel.RecordVersion, mappedResult.RecordVersion);
            Assert.Equal(storyHistoryModel.FieldName, mappedResult.FieldName);
            Assert.Equal(storyHistoryModel.PreviousValue, mappedResult.PreviousValue);
        }
    }
}