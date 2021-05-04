using System;
using FluentValidation.TestHelper;
using WebAPI.Models.Models.Models;
using WebAPI.Presentation.Validators;
using Xunit;

namespace WebAPI.UnitTests.Validators
{
    public class WorkSpaceValidatorTests
    {
        private WorkSpaceValidator _workSpaceValidator;
        
        [Fact]
        public void ShouldValidateCorrectWorkSpace()
        {
            //Arrange
            _workSpaceValidator = new WorkSpaceValidator();

            var workSpace = new WorkSpace
            {
                WorkSpaceId = Guid.Empty,
                WorkSpaceName = "New WorkSpace",
                WorkSpaceDescription = string.Empty,
                CreationDate = DateTime.Now
            };
            
            //Act
            var result = _workSpaceValidator.TestValidate(workSpace);

            //Assert
            Assert.True(result.IsValid);
            result.ShouldNotHaveAnyValidationErrors();
        }
        
        [Theory]
        [InlineData(null)]
        [InlineData("")]
        public void ShouldValidateIncorrectWorkSpaceName(string workSpaceName)
        {
            //Arrange
            _workSpaceValidator = new WorkSpaceValidator();

            var workSpace = new WorkSpace
            {
                WorkSpaceId = Guid.Empty,
                WorkSpaceName = workSpaceName,
                WorkSpaceDescription = string.Empty,
                CreationDate = DateTime.Now
            };
            
            //Act
            var result = _workSpaceValidator.TestValidate(workSpace);

            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.WorkSpaceName);
        }
    }
}