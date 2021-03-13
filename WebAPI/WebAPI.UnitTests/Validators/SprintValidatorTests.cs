using System;
using FluentValidation.TestHelper;
using WebAPI.Models.Models;
using WebAPI.Presentation.Validators;
using Xunit;

namespace WebAPI.UnitTests.Validators
{
    public class SprintValidatorTests
    {
        private SprintValidator _sprintValidator;

        [Fact]
        public void ShouldValidateCorrectSprint()
        {
            //Arrange
            var sprint = new Sprint
            {
                SprintId = new Guid("27c8b5ce-68a5-4e1d-bf08-90145205923e"),
                EpicId = new Guid("8dd03f43-3921-405b-b0e8-e10168094c37"),
                SprintName = "Name",
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow
            };
            
            _sprintValidator = new SprintValidator();
            
            //Act
            var result = _sprintValidator.TestValidate(sprint);

            //Assert
            Assert.True(result.IsValid);
            result.ShouldNotHaveAnyValidationErrors();
        }
        
        [Fact]
        public void ShouldValidateInCorrectSprintDates()
        {
            //Arrange
            var sprint = new Sprint
            {
                SprintId = new Guid("27c8b5ce-68a5-4e1d-bf08-90145205923e"),
                EpicId = new Guid("8dd03f43-3921-405b-b0e8-e10168094c37"),
                SprintName = "Name"
            };
            
            _sprintValidator = new SprintValidator();
            
            //Act
            var result = _sprintValidator.TestValidate(sprint);

            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.StartDate);
            result.ShouldHaveValidationErrorFor(x => x.EndDate);
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        public void ShouldValidateIncorrectSprintName(string sprintName)
        {
            //Arrange
            var sprint = new Sprint
            {
                SprintId = new Guid("27c8b5ce-68a5-4e1d-bf08-90145205923e"),
                EpicId = new Guid("8dd03f43-3921-405b-b0e8-e10168094c37"),
                SprintName = sprintName,
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow
            };
            
            _sprintValidator = new SprintValidator();
            
            //Act
            var result = _sprintValidator.TestValidate(sprint);

            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.SprintName);
        }
        
        [Fact]
        public void ShouldValidateInCorrectSprintEpicId()
        {
            //Arrange
            var sprint = new Sprint
            {
                SprintId = new Guid("27c8b5ce-68a5-4e1d-bf08-90145205923e"),
                SprintName = "Name",
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow
            };
            
            _sprintValidator = new SprintValidator();
            
            //Act
            var result = _sprintValidator.TestValidate(sprint);

            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.EpicId);
        }
    }
}