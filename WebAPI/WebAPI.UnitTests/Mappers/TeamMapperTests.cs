using System;
using System.Collections.Generic;
using FakeItEasy;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Presentation.Mappers;
using Xunit;

namespace WebAPI.UnitTests.Mappers
{
    public class TeamMapperTests
    {
        [Fact]
        public void ShouldReturnEmptyModelOnNullEntity()
        {
            //Arrange
            var userMapper = A.Fake<IUserMapper>();

            //Act
            var teamMapper = new TeamMapper(userMapper);
            var mappedResult = teamMapper.MapToModel(null);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyEntityOnNullModel()
        {
            //Arrange
            var userMapper = A.Fake<IUserMapper>();
            
            //Act
            var teamMapper = new TeamMapper(userMapper);
            var mappedResult = teamMapper.MapToEntity(null);

            //Assert
            Assert.NotNull(mappedResult);
        }

        [Fact]
        public void ShouldMapModelToEntity()
        {
            //Arrange
            var userMapper = A.Fake<IUserMapper>();
            
            var teamId = new Guid();

            var teamModel = new Models.Models.Team
            {
                TeamId = teamId,
                TeamName = "TeamName",
                Location = "Phoenix",
                MembersCount = 0
            };
            
            var teamEntity = new Team
            {
                Id = teamId,
                TeamName = "TeamName",
                Location = "Phoenix",
                TeamUsers = new List<TeamUser>(),
            };
            
            //Act
            var teamMapper = new TeamMapper(userMapper);
            var mappedResult = teamMapper.MapToEntity(teamModel);

            //Assert
            Assert.Equal(teamEntity.Id, mappedResult.Id);
            Assert.Equal(teamEntity.TeamName, mappedResult.TeamName);
            Assert.Equal(teamEntity.Location, mappedResult.Location);
            Assert.Equal(teamEntity.MembersCount, mappedResult.MembersCount);
        }
        
        [Fact]
        public void ShouldMapEntityToModel()
        {
            //Arrange
            var userMapper = A.Fake<IUserMapper>();
            
            var teamId = new Guid();
            
            var teamEntity = new Team
            {
                Id = teamId,
                TeamName = "Team",
                Location = "Minsk",
                TeamUsers = new List<TeamUser>(),
            };
            
            var teamModel = new Models.Models.Team
            {
                TeamId = teamId,
                TeamName = "Team",
                Location = "Minsk",
                MembersCount = 0
            };
            
            //Act
            var teamMapper = new TeamMapper(userMapper);
            var mappedResult = teamMapper.MapToModel(teamEntity);

            //Assert
            Assert.Equal(teamModel.TeamId, mappedResult.TeamId);
            Assert.Equal(teamModel.TeamName, mappedResult.TeamName);
            Assert.Equal(teamModel.Location, mappedResult.Location);
            Assert.Equal(teamModel.MembersCount, mappedResult.MembersCount);
        }
    }
}