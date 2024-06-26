using FluentValidation.TestHelper;
using WebAPI.Models.Models;
using WebAPI.Presentation.Models;
using WebAPI.Presentation.Models.Request;
using WebAPI.Presentation.Validators;
using Xunit;

namespace WebAPI.UnitTests.Validators
{
    public class AuthenticationUserValidatorTests
    {
        private SignUpUserValidator _signUpUserValidator;

        [Fact]
        public void ShouldValidateCorrectAuthenticationUser()
        {
            //Arrange
            var authUser = new SignUpUserRequestModel
            {
                Email = "Name",
                Password = "123",
                UserName = "test@mail.com",
            };
            
            _signUpUserValidator = new SignUpUserValidator();
            
            //Act
            var result = _signUpUserValidator.TestValidate(authUser);

            //Assert
            Assert.True(result.IsValid);
            result.ShouldNotHaveAnyValidationErrors();
        }
        
        [Theory]
        [InlineData(null)]
        [InlineData("")]
        public void ShouldValidateInCorrectAuthenticationUserName(string username)
        {
            //Arrange
            var authUser = new SignUpUserRequestModel
            {
                Email = username,
                Password = "123",
                UserName = "test@mail.com",
            };
            
            _signUpUserValidator = new SignUpUserValidator();
            
            //Act
            var result = _signUpUserValidator.TestValidate(authUser);

            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.Email);
        }
        
        [Theory]
        [InlineData(null)]
        [InlineData("")]
        public void ShouldValidateInCorrectAuthenticationUserPassword(string password)
        {
            //Arrange
            var authUser = new SignUpUserRequestModel
            {
                Email = "Name",
                Password = password,
                UserName = "test@mail.com",
            };
            
            _signUpUserValidator = new SignUpUserValidator();
            
            //Act
            var result = _signUpUserValidator.TestValidate(authUser);

            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.Password);
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
            var authUser = new SignUpUserRequestModel
            {
                Email = "Name",
                Password = "123",
                UserName = email
            };
            
            _signUpUserValidator = new SignUpUserValidator();
            
            //Act
            var result = _signUpUserValidator.TestValidate(authUser);
            
            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.UserName);
        }
    }
}