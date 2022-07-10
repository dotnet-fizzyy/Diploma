using System;
using WebAPI.Core.Constants;
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
            //Arrange & Act
            var mappedResult = StoryHistoryMapper.Map(null);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyEntityOnNullModel()
        {
            //Arrange & Act
            var mappedResult = StoryHistoryMapper.Map(null);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldMapEntityToModel()
        {
            //Arrange
            var storyHistoryId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var storyId = new Guid("3333238f-87e6-4e86-93fc-ab79b8804444");
            const string fieldName = StoryFields.Title;
            const string newValue = "NewValue";
            const string oldValue = "OldValue";
            const string userName = "UserName";
            
            var storyHistoryEntity = new StoryHistory
            {
                Id = storyHistoryId,
                StoryHistoryAction = StoryHistoryAction.Add,
                StoryId = storyId,
                CurrentValue = newValue,
                PreviousValue = oldValue,
                FieldName = fieldName,
                UserName = userName
            };
            
            var storyHistoryModel = new Models.Models.Models.StoryHistory
            {
                StoryHistoryId = storyHistoryId,
                StoryHistoryAction = Models.Enums.StoryHistoryAction.Add,
                StoryId = storyId,
                CurrentValue = newValue,
                PreviousValue = oldValue,
                FieldName = fieldName,
                UserName = userName
            };

            //Act
            var mappedResult = StoryHistoryMapper.Map(storyHistoryEntity);

            //Assert
            Assert.Equal(storyHistoryModel.StoryHistoryId, mappedResult.StoryHistoryId);
            Assert.Equal(storyHistoryModel.StoryId, mappedResult.StoryId);
            Assert.Equal(storyHistoryModel.StoryHistoryAction.ToString(), mappedResult.StoryHistoryAction.ToString());
            Assert.Equal(storyHistoryModel.UserName, mappedResult.UserName);
            Assert.Equal(storyHistoryModel.CurrentValue, mappedResult.CurrentValue);
            Assert.Equal(storyHistoryModel.FieldName, mappedResult.FieldName);
            Assert.Equal(storyHistoryModel.PreviousValue, mappedResult.PreviousValue);
        }
    }
}