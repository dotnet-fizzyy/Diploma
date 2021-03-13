using System;
using FluentValidation.TestHelper;
using WebAPI.Models.Models;
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
                Customer = "CustomerId"
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
                Customer = "CustomerId"
            };
            
            //Act
            var result = _projectValidator.TestValidate(project);
            
            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.StartDate);
            result.ShouldHaveValidationErrorFor(x => x.EndDate);
        }
        
        [Theory]
        [InlineData(null)]
        [InlineData("")]
        public void ShouldValidateIncorrectProjectCustomer(string customerId)
        {
            //Arrange
            _projectValidator = new ProjectValidator();

            var project = new Project
            {
                ProjectName = "Name",
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow,
                Customer = customerId
            };
            
            //Act
            var result = _projectValidator.TestValidate(project);
            
            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.Customer).WithErrorMessage("Project requires customer");
        }
    }
}