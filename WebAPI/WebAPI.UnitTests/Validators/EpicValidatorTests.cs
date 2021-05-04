using System;
using FluentValidation.TestHelper;
using WebAPI.Models.Models.Models;
using WebAPI.Presentation.Validators;
using Xunit;

namespace WebAPI.UnitTests.Validators
{
    public class EpicValidatorTests
    {
        private EpicValidator _epicValidator;

        [Fact]
        public void ShouldValidateCorrectEpic()
        {
            //Arrange
            _epicValidator = new EpicValidator();

            var epic = new Epic
            {
                EpicId = new Guid("8568a470-9c93-458d-a41d-c0fb54b16908"),
                ProjectId = new Guid("1b7572ee-eb5b-4094-bd5e-e2191090c4bb"),
                EpicName = "Name",
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow
            };
            
            //Act
            var result = _epicValidator.TestValidate(epic);

            //Assert
            Assert.True(result.IsValid);
            result.ShouldNotHaveAnyValidationErrors();
        }
        
        [Theory]
        [InlineData(null)]
        [InlineData("")]
        public void ShouldValidateInCorrectEpicName(string epicName)
        {
            //Arrange
            _epicValidator = new EpicValidator();

            var epic = new Epic
            {
                EpicId = new Guid("8568a470-9c93-458d-a41d-c0fb54b16908"),
                ProjectId = new Guid("1b7572ee-eb5b-4094-bd5e-e2191090c4bb"),
                EpicName = epicName,
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow
            };
            
            //Act
            var result = _epicValidator.TestValidate(epic);

            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.EpicName);
        }
        
        [Fact]
        public void ShouldValidateInCorrectEpicStartDate()
        {
            //Arrange
            _epicValidator = new EpicValidator();

            var epic = new Epic
            {
                EpicId = new Guid("8568a470-9c93-458d-a41d-c0fb54b16908"),
                ProjectId = new Guid("1b7572ee-eb5b-4094-bd5e-e2191090c4bb"),
                EpicName = "Name"
            };
            
            //Act
            var result = _epicValidator.TestValidate(epic);

            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.StartDate);
            result.ShouldHaveValidationErrorFor(x => x.EndDate);
        }

        [Fact]
        public void ShouldValidateIncorrectEpicProjectId()
        {
            //Arrange
            _epicValidator = new EpicValidator();

            var epic = new Epic
            {
                EpicId = new Guid("8568a470-9c93-458d-a41d-c0fb54b16908"),
                EpicName = "Name",
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow
            };
            
            //Act
            var result = _epicValidator.TestValidate(epic);

            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.ProjectId);
        }
    }
}