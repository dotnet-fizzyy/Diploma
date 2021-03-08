using System;
using System.Collections.Generic;
using System.Linq;
using FakeItEasy;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Presentation.Mappers;
using Xunit;

namespace WebAPI.UnitTests.Mappers
{
    public class ProjectMapperTests
    {
        [Fact]
        public void ShouldReturnEmptyModelOnNullEntity()
        {
            //Arrange
            var teamMapper = A.Fake<ITeamMapper>();
            var epicMapper = A.Fake<IEpicMapper>();

            Project projectEntity = null;
            
            //Act
            var projectMapper = new ProjectMapper(teamMapper, epicMapper);
            var mappedResult = projectMapper.MapToModel(projectEntity);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyEntityOnNullModel()
        {
            //Arrange
            var teamMapper = A.Fake<ITeamMapper>();
            var epicMapper = A.Fake<IEpicMapper>();

            Models.Models.Project projectModel = null;
            
            //Act
            var projectMapper = new ProjectMapper(teamMapper, epicMapper);
            var mappedResult = projectMapper.MapToEntity(projectModel);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyFullModelOnNullEntity()
        {
            //Arrange
            var teamMapper = A.Fake<ITeamMapper>();
            var epicMapper = A.Fake<IEpicMapper>();

            Project projectEntity = null;
            
            //Act
            var projectMapper = new ProjectMapper(teamMapper, epicMapper);
            var mappedResult = projectMapper.MapToFullModel(projectEntity);

            //Assert
            Assert.NotNull(mappedResult);
        }

        [Fact]
        public void ShouldMapEntityToModel()
        {
            //Arrange
            var teamMapper = A.Fake<ITeamMapper>();
            var epicMapper = A.Fake<IEpicMapper>();
            
            var projectId = new Guid();
            
            var projectEntity = new Project
            {
                Id = projectId,
                ProjectName = "Name",
                ProjectDescription = "Description",
                StartDate = new DateTime(2020, 11, 11),
                EndDate = new DateTime(2020, 11, 19),
                Customer = "Customer"
            };

            var projectModel = new Models.Models.Project
            {
                ProjectId = projectId,
                ProjectName = "Name",
                ProjectDescription = "Description",
                StartDate = new DateTime(2020, 11, 11),
                EndDate = new DateTime(2020, 11, 19),
                Customer = "Customer"
            };
            
            //Act
            var projectMapper = new ProjectMapper(teamMapper, epicMapper);
            var mappedResult = projectMapper.MapToModel(projectEntity);

            //Assert
            Assert.Equal(projectModel.ProjectId, mappedResult.ProjectId);
            Assert.Equal(projectModel.ProjectName, mappedResult.ProjectName);
            Assert.Equal(projectModel.ProjectDescription, mappedResult.ProjectDescription);
            Assert.Equal(projectModel.StartDate, mappedResult.StartDate);
            Assert.Equal(projectModel.EndDate, mappedResult.EndDate);
            Assert.Equal(projectModel.Customer, mappedResult.Customer);
        }
        
        [Fact]
        public void ShouldMapModelToEntity()
        {
            //Arrange
            var teamMapper = A.Fake<ITeamMapper>();
            var epicMapper = A.Fake<IEpicMapper>();

            var projectId = new Guid();
            
            var projectEntity = new Project
            {
                Id = projectId,
                ProjectName = "SomeName",
                ProjectDescription = "Desc",
                StartDate = new DateTime(2020, 11, 11),
                EndDate = new DateTime(2020, 11, 19),
                Customer = "CustomerName"
            };

            var projectModel = new Models.Models.Project
            {
                ProjectId = projectId,
                ProjectName = "SomeName",
                ProjectDescription = "Desc",
                StartDate = new DateTime(2020, 11, 11),
                EndDate = new DateTime(2020, 11, 19),
                Customer = "CustomerName"
            };
            
            //Act
            var projectMapper = new ProjectMapper(teamMapper, epicMapper);
            var mappedResult = projectMapper.MapToEntity(projectModel);

            //Assert
            Assert.Equal(projectEntity.Id, mappedResult.Id);
            Assert.Equal(projectEntity.ProjectName, mappedResult.ProjectName);
            Assert.Equal(projectEntity.ProjectDescription, mappedResult.ProjectDescription);
            Assert.Equal(projectEntity.StartDate, mappedResult.StartDate);
            Assert.Equal(projectEntity.EndDate, mappedResult.EndDate);
            Assert.Equal(projectEntity.Customer, mappedResult.Customer);
        }
        
        [Fact]
        public void ShouldMapEntityToFullModel()
        {
            //Arrange
            var teamMapper = A.Fake<ITeamMapper>();
            var epicMapper = A.Fake<IEpicMapper>();

            var projectId = new Guid();
            var teamId = new Guid();
            
            var projectEntity = new Project
            {
                Id = projectId,
                ProjectName = "Name",
                ProjectDescription = "Description",
                StartDate = new DateTime(2020, 11, 11),
                EndDate = new DateTime(2020, 11, 19),
                Customer = "Customer",
                Teams = new List<Team>
                {
                    new Team
                    {
                        Id = teamId,
                        Location = "Minsk",
                        ProjectId = projectId,
                        TeamName = "TopTeam"
                    }
                }
            };

            var projectModel = new Models.Result.FullProject
            {
                ProjectId = projectId,
                ProjectName = "Name",
                ProjectDescription = "Description",
                StartDate = new DateTime(2020, 11, 11),
                EndDate = new DateTime(2020, 11, 19),
                Customer = "Customer",
                Teams = new List<Models.Models.Team>
                {
                    new Models.Models.Team
                    {
                        TeamId = teamId,
                        Location = "Minsk",
                        TeamName = "TopTeam"
                    }
                }
            };
            
            //Act
            A.CallTo(() => teamMapper.MapToModel(projectEntity.Teams.First()))
                .Returns(projectModel.Teams.First());
            
            var projectMapper = new ProjectMapper(teamMapper, epicMapper);
            var mappedResult = projectMapper.MapToFullModel(projectEntity);

            //Assert
            Assert.Equal(projectModel.ProjectId, mappedResult.ProjectId);
            Assert.Equal(projectModel.ProjectName, mappedResult.ProjectName);
            Assert.Equal(projectModel.ProjectDescription, mappedResult.ProjectDescription);
            Assert.Equal(projectModel.StartDate, mappedResult.StartDate);
            Assert.Equal(projectModel.EndDate, mappedResult.EndDate);
            Assert.Equal(projectModel.Customer, mappedResult.Customer);
            Assert.All(mappedResult.Teams, team =>
            {
                Assert.Equal(projectModel.Teams.First().TeamId, mappedResult.Teams.First().TeamId);
                Assert.Equal(projectModel.Teams.First().Location, mappedResult.Teams.First().Location);
                Assert.Equal(projectModel.Teams.First().TeamName, mappedResult.Teams.First().TeamName);
            });

            A.CallTo(() => teamMapper.MapToModel(projectEntity.Teams.First()))
                .MustHaveHappened();
        }
    }
}