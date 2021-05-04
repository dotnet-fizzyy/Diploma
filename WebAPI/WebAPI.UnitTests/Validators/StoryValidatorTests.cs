using System;
using FluentValidation.TestHelper;
using WebAPI.Models.Models.Models;
using WebAPI.Presentation.Validators;
using Xunit;

namespace WebAPI.UnitTests.Validators
{
    public class StoryValidatorTests
    {
        private StoryValidator _storyValidator;

        [Fact]
        public void ShouldValidateCorrectStory()
        {
            //Arrange
            var story = new Story
            {
                StoryId = new Guid("e9fc4430-62bd-4a33-bee4-d952106f9dd4"),
                Title = "Title",
                Description = "Desc",
                Notes = "Notes",
                Estimate = 2,
                IsBlocked = false,
                RecordVersion = 123,
                IsDeleted = false
            };
            
            _storyValidator = new StoryValidator();
            
            //Act
            var result = _storyValidator.TestValidate(story);

            //Assert
            Assert.True(result.IsValid);
            result.ShouldNotHaveAnyValidationErrors();
        }
        
        [Fact]
        public void ShouldValidateInCorrectStoryId()
        {
            //Arrange
            var story = new Story
            {
                Title = "Title",
                Description = "Desc",
                Notes = "Notes",
                Estimate = 2,
                IsReady = false,
                IsBlocked = false,
                RecordVersion = 123,
                IsDeleted = false
            };
            
            _storyValidator = new StoryValidator();
            
            //Act
            var result = _storyValidator.TestValidate(story);

            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.StoryId);
        }
        
        [Fact]
        public void ShouldValidateInCorrectStoryRecordVersion()
        {
            //Arrange
            var story = new Story
            {
                StoryId = new Guid("e9fc4430-62bd-4a33-bee4-d952106f9dd4"),
                Title = "Title",
                Description = "Desc",
                Notes = "Notes",
                Estimate = 2,
                IsBlocked = false,
                IsDeleted = false
            };
            
            _storyValidator = new StoryValidator();
            
            //Act
            var result = _storyValidator.TestValidate(story);

            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.RecordVersion);
        }
        
        [Theory]
        [InlineData(null)]
        [InlineData("")]
        public void ShouldValidateInCorrectStoryTitle(string title)
        {
            //Arrange
            var story = new Story
            {
                StoryId = new Guid("e9fc4430-62bd-4a33-bee4-d952106f9dd4"),
                Title = title,
                Description = "Desc",
                Notes = "Notes",
                Estimate = 2,
                IsBlocked = false,
                RecordVersion = 123,
                IsDeleted = false
            };
            
            _storyValidator = new StoryValidator();
            
            //Act
            var result = _storyValidator.TestValidate(story);

            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.Title);
        }
        
        [Fact]
        public void ShouldValidateInCorrectStoryEstimate()
        {
            //Arrange
            var story = new Story
            {
                StoryId = new Guid("e9fc4430-62bd-4a33-bee4-d952106f9dd4"),
                Title = "Title",
                Description = "Desc",
                Notes = "Notes",
                IsBlocked = false,
                IsDeleted = false
            };
            
            _storyValidator = new StoryValidator();
            
            //Act
            var result = _storyValidator.TestValidate(story);

            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.Estimate);
        }
        
        [Theory]
        [InlineData(null)]
        [InlineData("")]
        public void ShouldValidateInCorrectStoryBlockReason(string blockReason)
        {
            //Arrange
            var story = new Story
            {
                StoryId = new Guid("e9fc4430-62bd-4a33-bee4-d952106f9dd4"),
                Title = "Title",
                Description = "Desc",
                Notes = "Notes",
                Estimate = 2,
                IsBlocked = true,
                BlockReason = blockReason,
                RecordVersion = 123,
                IsDeleted = false
            };
            
            _storyValidator = new StoryValidator();
            
            //Act
            var result = _storyValidator.TestValidate(story);

            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.BlockReason);
        }
        
        [Fact]
        public void ShouldValidateInCorrectStoryReadyStatus()
        {
            //Arrange
            var story = new Story
            {
                StoryId = new Guid("e9fc4430-62bd-4a33-bee4-d952106f9dd4"),
                Title = "Title",
                Description = "Desc",
                Notes = "Notes",
                IsReady = true,
                IsBlocked = true,
                BlockReason = "Reason",
                IsDeleted = false
            };
            
            _storyValidator = new StoryValidator();
            
            //Act
            var result = _storyValidator.TestValidate(story);

            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.IsReady).WithErrorMessage("Story cannot be blocked and ready at the same time");
        }
        
        [Fact]
        public void ShouldValidateInCorrectStoryBlockedStatus()
        {
            //Arrange
            var story = new Story
            {
                StoryId = new Guid("e9fc4430-62bd-4a33-bee4-d952106f9dd4"),
                Title = "Title",
                Description = "Desc",
                Notes = "Notes",
                IsReady = true,
                IsBlocked = true,
                BlockReason = "Reason",
                IsDeleted = false
            };
            
            _storyValidator = new StoryValidator();
            
            //Act
            var result = _storyValidator.TestValidate(story);

            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.IsBlocked).WithErrorMessage("Story cannot be blocked and ready at the same time");
        }
    }
}