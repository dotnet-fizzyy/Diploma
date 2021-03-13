using System.Collections.Generic;
using FluentValidation.TestHelper;
using WebAPI.Models.Models;
using WebAPI.Presentation.Validators;
using Xunit;

namespace WebAPI.UnitTests.Validators
{
    public class StoryUpdateValidatorTests
    {
        private StoryUpdateValidator _storyUpdateValidator;

        [Fact]
        public void ShouldValidateCorrectStoryUpdate()
        {
            //Arrange
            var storyUpdate = new StoryUpdate
            {
                Story = new Story(),
                Parts = new List<StoryUpdatePart>
                {
                    new StoryUpdatePart()
                }
            };

            _storyUpdateValidator = new StoryUpdateValidator();
            
            //Act
            var result = _storyUpdateValidator.TestValidate(storyUpdate);

            //Assert
            Assert.True(result.IsValid);
            result.ShouldNotHaveAnyValidationErrors();
        }
        
        [Fact]
        public void ShouldValidateInCorrectStoryUpdateStory()
        {
            //Arrange
            var storyUpdate = new StoryUpdate
            {
                Parts = new List<StoryUpdatePart>
                {
                    new StoryUpdatePart()
                }
            };

            _storyUpdateValidator = new StoryUpdateValidator();
            
            //Act
            var result = _storyUpdateValidator.TestValidate(storyUpdate);

            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.Story);
        }
        
        [Fact]
        public void ShouldValidateInCorrectStoryUpdateStoryParts()
        {
            //Arrange
            var storyUpdate = new StoryUpdate
            {
                Story = new Story()
            };

            _storyUpdateValidator = new StoryUpdateValidator();
            
            //Act
            var result = _storyUpdateValidator.TestValidate(storyUpdate);

            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.Parts);
        }
        
        [Fact]
        public void ShouldValidateInCorrectStoryUpdateStoryPartsLength()
        {
            //Arrange
            var storyUpdate = new StoryUpdate
            {
                Story = new Story(),
                Parts = new List<StoryUpdatePart>()
            };

            _storyUpdateValidator = new StoryUpdateValidator();
            
            //Act
            var result = _storyUpdateValidator.TestValidate(storyUpdate);

            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.Parts);
        }
    }
}