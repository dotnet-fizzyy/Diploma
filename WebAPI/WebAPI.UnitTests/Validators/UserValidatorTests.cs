using System;
using FluentValidation.TestHelper;
using WebAPI.Models.Models.Models;
using WebAPI.Presentation.Validators;
using Xunit;

namespace WebAPI.UnitTests.Validators
{
    public class UserValidatorTests
    {
        private UserValidator _userValidator;

        [Fact]
        public void ShouldValidateCorrectUser()
        {
            //Arrange
            _userValidator = new UserValidator();

            var user = new User
            {
                UserId = new Guid("d295f413-d8c7-4e58-98ac-62c77bab6365"),
                Email = "test@mail.com",
                UserName = "Name"
            };
            
            //Act
            var result = _userValidator.TestValidate(user);
            
            //Assert
            Assert.True(result.IsValid);
            result.ShouldNotHaveAnyValidationErrors();
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        public void ShouldValidateIncorrectUserName(string name)
        {
            //Arrange
            _userValidator = new UserValidator();

            var user = new User
            {
                UserId = new Guid("d295f413-d8c7-4e58-98ac-62c77bab6365"),
                Email = "email@mai.com",
                UserName = name
            };
            
            //Act
            var result = _userValidator.TestValidate(user);
            
            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.UserName);
        }
        
        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData("test.com")]
        [InlineData("test@test")]
        [InlineData("test@.com")]
        public void ShouldValidateIncorrectUserEmail(string email)
        {
            //Arrange
            _userValidator = new UserValidator();

            var user = new User
            {
                UserId = new Guid("d295f413-d8c7-4e58-98ac-62c77bab6365"),
                Email = email,
                UserName = "Name"
            };
            
            //Act
            var result = _userValidator.TestValidate(user);
            
            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.Email);
        }
    }
}