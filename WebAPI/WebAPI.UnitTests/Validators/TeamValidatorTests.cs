using System;
using FluentValidation.TestHelper;
using WebAPI.Models.Models.Models;
using WebAPI.Presentation.Validators;
using Xunit;

namespace WebAPI.UnitTests.Validators
{
    public class TeamValidatorTests
    {
        private TeamValidator _teamValidator;

        [Fact]
        public void ShouldValidateCorrectTeam()
        {
            //Arrange
            var team = new Team
            {
                TeamId = new Guid("25ae4e1b-c700-42aa-b37d-22f8055f858f"),
                TeamName = "Name",
                Location = "Minsk",
                MembersCount = 0
            };
            
            _teamValidator = new TeamValidator();

            //Act
            var result = _teamValidator.TestValidate(team);

            //Assert
            Assert.True(result.IsValid);
            result.ShouldNotHaveAnyValidationErrors();
        }
        
        [Theory]
        [InlineData(null)]
        [InlineData("")]
        public void ShouldValidateInCorrectTeamName(string teamName)
        {
            //Arrange
            var team = new Team
            {
                TeamId = new Guid("25ae4e1b-c700-42aa-b37d-22f8055f858f"),
                TeamName = teamName,
                Location = "Minsk",
                MembersCount = 0
            };
            
            _teamValidator = new TeamValidator();

            //Act
            var result = _teamValidator.TestValidate(team);

            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.TeamName);
        }
        
        [Theory]
        [InlineData(null)]
        [InlineData("")]
        public void ShouldValidateInCorrectTeamLocation(string location)
        {
            //Arrange
            var team = new Team
            {
                TeamId = new Guid("25ae4e1b-c700-42aa-b37d-22f8055f858f"),
                TeamName = "Name",
                Location = location,
                MembersCount = 0
            };
            
            _teamValidator = new TeamValidator();

            //Act
            var result = _teamValidator.TestValidate(team);

            //Assert
            Assert.False(result.IsValid);
            result.ShouldHaveValidationErrorFor(x => x.Location);
        }
    }
}