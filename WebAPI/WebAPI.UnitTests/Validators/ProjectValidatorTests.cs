using System;
using FluentValidation.TestHelper;
using WebAPI.Models.Models.Models;
using WebAPI.Presentation.Validators;
using Xunit;

namespace WebAPI.UnitTests.Validators
{
    public class ProjectValidatorTests
    {
        private ProjectValidator _projectValidator;

        [Fact]
        public void ShouldValidateCorrectProject()
        {
            //Arrange
            _projectValidator = new ProjectValidator();

            var project = new Project
            {
                ProjectName = "Name",
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow,
                WorkSpaceId =  new Guid("1b7572ee-eb5b-4094-bd5e-e2191090c333")
            };
            
            //Act
            var result = _projectValidator.TestValidate(project);
            
            //Assert
            Assert.True(result.IsValid);
            result.ShouldNotHaveAnyValidationErrors();
        }

        [Fact]
        public void ShouldValidateIncorrectProjectDates()
        {
            //Arrange
            _projectValidator = new ProjectValidator();

            var project = new Project
            {
                ProjectName = "Name",
                WorkSpaceId = new Guid("1b7572ee-eb5b-4094-bd5e-e2191090c333")
            };
            
            //Act
            var result = _projectValidator.TestValidate(project);
            
            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.StartDate);
            result.ShouldHaveValidationErrorFor(x => x.EndDate);
        }
    }
}