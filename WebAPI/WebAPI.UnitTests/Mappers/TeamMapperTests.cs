using System;
using System.Collections.Generic;
using WebAPI.Core.Entities;
using WebAPI.Models.Models.Simple;
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
            var teamMapper = new TeamMapper();
            
            //Act
            var mappedResult = teamMapper.MapToModel(null);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyEntityOnNullModel()
        {
            //Arrange
            var teamMapper = new TeamMapper();

            //Act
            var mappedResult = teamMapper.MapToEntity(null);

            //Assert
            Assert.NotNull(mappedResult);
        }

        [Fact]
        public void ShouldMapModelToEntity()
        {
            //Arrange
            var teamMapper = new TeamMapper();
            
            var teamId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var projectId = new Guid("3333238f-87e6-4e86-93fc-ab79b8804444");
            const string teamName = "TeamName";
            const string location = "Minsk";
            var creationDate = DateTime.UtcNow;
            const bool isDeleted = true;

            var teamModel = new Models.Models.Models.Team
            {
                TeamId = teamId,
                ProjectId = projectId,
                TeamName = teamName,
                Location = location,
                MembersCount = 0,
                CreationDate = creationDate,
                IsDeleted = isDeleted,
            };
            
            var teamEntity = new Team
            {
                Id = teamId,
                ProjectId = projectId,
                TeamName = teamName,
                Location = location,
                TeamUsers = new List<TeamUser>(),
                CreationDate = creationDate,
                IsDeleted = isDeleted,
            };
            
            //Act
            var mappedResult = teamMapper.MapToEntity(teamModel);

            //Assert
            Assert.Equal(teamEntity.Id, mappedResult.Id);
            Assert.Equal(teamEntity.ProjectId, mappedResult.ProjectId);
            Assert.Equal(teamEntity.TeamName, mappedResult.TeamName);
            Assert.Equal(teamEntity.Location, mappedResult.Location);
            Assert.Equal(teamEntity.MembersCount, mappedResult.MembersCount);
            Assert.Equal(teamEntity.CreationDate, mappedResult.CreationDate);
            Assert.Equal(teamEntity.IsDeleted, mappedResult.IsDeleted);
        }
        
        [Fact]
        public void ShouldMapEntityToModel()
        {
            //Arrange
            var teamMapper = new TeamMapper();
            
            var teamId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var projectId = new Guid("3333238f-87e6-4e86-93fc-ab79b8804444");
            const string teamName = "TeamName";
            const string location = "Minsk";
            var creationDate = DateTime.UtcNow;
            
            var teamEntity = new Team
            {
                Id = teamId,
                ProjectId = projectId,
                TeamName = teamName,
                Location = location,
                TeamUsers = new List<TeamUser>(),
                CreationDate = creationDate,
            };
            
            var teamModel = new Models.Models.Models.Team
            {
                TeamId = teamId,
                ProjectId = projectId,
                TeamName = teamName,
                Location = location,
                MembersCount = 0,
                CreationDate = creationDate,
            };
            
            //Act
            var mappedResult = teamMapper.MapToModel(teamEntity);

            //Assert
            Assert.Equal(teamModel.TeamId, mappedResult.TeamId);
            Assert.Equal(teamModel.ProjectId, mappedResult.ProjectId);
            Assert.Equal(teamModel.TeamName, mappedResult.TeamName);
            Assert.Equal(teamModel.Location, mappedResult.Location);
            Assert.Equal(teamModel.MembersCount, mappedResult.MembersCount);
            Assert.Equal(teamModel.CreationDate, mappedResult.CreationDate);
            Assert.Equal(teamModel.IsDeleted, mappedResult.IsDeleted);
        }

        [Fact]
        public void ShouldReturnEmptyModelForNullEntityOnMapToTeamSimpleModel()
        {
            //Arrange
            var teamMapper = new TeamMapper();
            
            //Act
            var result = teamMapper.MapToSimpleModel(null);

            //Assert
            Assert.NotNull(result);
        }
        
        [Fact]
        public void ShouldMapToTeamSimpleModel()
        {
            //Arrange
            var teamMapper = new TeamMapper();
            
            var teamId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var projectId = new Guid("5593238f-87e6-4e86-93fc-ab79b8804444");
            const string teamName = "TeamName";
            
            var teamEntity = new Team
            {
                Id = teamId,
                TeamName = teamName,
                ProjectId = projectId
            };

            var expectedModel = new TeamSimpleModel
            {
                TeamId = teamId,
                TeamName = teamName,
                ProjectId = projectId
            };
            
            //Act
            var result = teamMapper.MapToSimpleModel(teamEntity);

            //Assert
            Assert.Equal(expectedModel.TeamId, result.TeamId);
            Assert.Equal(expectedModel.TeamName, result.TeamName);
            Assert.Equal(expectedModel.ProjectId, result.ProjectId);
        }
    }
}