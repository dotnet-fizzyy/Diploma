using System;
using System.Collections.Generic;
using FakeItEasy;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Models.Result;
using WebAPI.Models.Models.Simple;
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

            var projectMapper = new ProjectMapper(teamMapper, epicMapper);
            
            //Act
            var mappedResult = projectMapper.MapToModel(null);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyEntityOnNullModel()
        {
            //Arrange
            var teamMapper = A.Fake<ITeamMapper>();
            var epicMapper = A.Fake<IEpicMapper>();

            var projectMapper = new ProjectMapper(teamMapper, epicMapper);
            
            //Act
            var mappedResult = projectMapper.MapToEntity(null);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldMapEntityToModel()
        {
            //Arrange
            var teamMapper = A.Fake<ITeamMapper>();
            var epicMapper = A.Fake<IEpicMapper>();
            
            var projectId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var workSpaceId = new Guid("1b7572ee-eb5b-4094-bd5e-e2191090c444");
            const string projectName = "SomeName";
            const string projectDescription = "SomeDescription";
            var startDate = DateTime.UtcNow.Date;
            var endDate = DateTime.UtcNow.Date.AddDays(2);
            
            var projectEntity = new Project
            {
                Id = projectId,
                ProjectName = projectName,
                ProjectDescription = projectDescription,
                StartDate = startDate,
                EndDate = endDate,
                WorkSpaceId = workSpaceId
            };

            var expectedModel = new Models.Models.Models.Project
            {
                ProjectId = projectId,
                ProjectName = projectName,
                ProjectDescription = projectDescription,
                StartDate = startDate,
                EndDate = endDate,
                WorkSpaceId = workSpaceId
            };
            
            var projectMapper = new ProjectMapper(teamMapper, epicMapper);
            
            //Act
            var mappedResult = projectMapper.MapToModel(projectEntity);

            //Assert
            AssertProjectModelProperties(expectedModel, mappedResult);
        }
        
        [Fact]
        public void ShouldMapEntityToFullModel()
        {
            //Arrange
            var projectId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var workSpaceId = new Guid("1b7572ee-eb5b-4094-bd5e-e2191090c444");
            const string projectName = "SomeName";
            const string projectDescription = "SomeDescription";
            var startDate = DateTime.UtcNow.Date;
            var endDate = DateTime.UtcNow.Date.AddDays(2);

            var epicId = new Guid("3333238f-87e6-4e86-93fc-ab79b8804444");
            const string epicName = "SomeName";
            
            var teamId = new Guid("3333238f-87e6-4e86-93fc-ab79b8804444");
            const string teamName = "SomeName";
            
            var projectEntity = new Project
            {
                Id = projectId,
                ProjectName = projectName,
                ProjectDescription = projectDescription,
                StartDate = startDate,
                EndDate = endDate,
                WorkSpaceId = workSpaceId,
                Teams = new List<Team>
                {
                    new Team
                    {
                        Id = teamId,
                        TeamName = teamName
                    }
                },
                Epics = new List<Epic>
                {
                    new Epic
                    {
                        Id = epicId,
                        EpicName = epicName
                    }
                }
            };

            var expectedModel = new FullProject
            {
                ProjectId = projectId,
                ProjectName = projectName,
                ProjectDescription = projectDescription,
                StartDate = startDate,
                EndDate = endDate,
                WorkSpaceId = workSpaceId,
                Epics = new List<Models.Models.Models.Epic>
                {
                    new Models.Models.Models.Epic
                    {
                        EpicId = epicId,
                        EpicName = epicName,
                    }
                },
                Teams = new List<Models.Models.Models.Team>
                {
                    new Models.Models.Models.Team
                    {
                        TeamId = teamId,
                        TeamName = teamName,
                    }
                }
            };
            
            var projectMapper = new ProjectMapper(new TeamMapper(new UserMapper()), new EpicMapper(new SprintMapper(new StoryMapper(new StoryHistoryMapper()))));
            
            //Act
            var mappedResult = projectMapper.MapToFullModel(projectEntity);

            //Assert
            AssertProjectModelProperties(expectedModel, mappedResult);
            
            Assert.Equal(expectedModel.Teams.Count, mappedResult.Teams.Count);
            Assert.Equal(expectedModel.Epics.Count, mappedResult.Epics.Count);
            Assert.Equal(expectedModel.Teams[0].TeamId, mappedResult.Teams[0].TeamId);
            Assert.Equal(expectedModel.Teams[0].TeamName, mappedResult.Teams[0].TeamName);
            Assert.Equal(expectedModel.Epics[0].EpicId, mappedResult.Epics[0].EpicId);
            Assert.Equal(expectedModel.Epics[0].EpicName, mappedResult.Epics[0].EpicName);
        }
        
        [Fact]
        public void ShouldMapModelToEntity()
        {
            //Arrange
            var teamMapper = A.Fake<ITeamMapper>();
            var epicMapper = A.Fake<IEpicMapper>();

            var projectId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var workSpaceId = new Guid("1b7572ee-eb5b-4094-bd5e-e2191090c444");
            const string projectName = "SomeName";
            const string projectDescription = "SomeDescription";
            var startDate = DateTime.UtcNow.Date;
            var endDate = DateTime.UtcNow.Date.AddDays(2);
            
            var projectEntity = new Project
            {
                Id = projectId,
                ProjectName = projectName,
                ProjectDescription = projectDescription,
                StartDate = startDate,
                EndDate = endDate,
                WorkSpaceId = workSpaceId
            };

            var projectModel = new Models.Models.Models.Project
            {
                ProjectId = projectId,
                ProjectName = projectName,
                ProjectDescription = projectDescription,
                StartDate = startDate,
                EndDate = endDate,
                WorkSpaceId = workSpaceId
            };
            
            var projectMapper = new ProjectMapper(teamMapper, epicMapper);
            
            //Act
            var mappedResult = projectMapper.MapToEntity(projectModel);

            //Assert
            Assert.Equal(projectEntity.Id, mappedResult.Id);
            Assert.Equal(projectEntity.ProjectName, mappedResult.ProjectName);
            Assert.Equal(projectEntity.ProjectDescription, mappedResult.ProjectDescription);
            Assert.Equal(projectEntity.StartDate, mappedResult.StartDate);
            Assert.Equal(projectEntity.EndDate, mappedResult.EndDate);
            Assert.Equal(projectEntity.WorkSpaceId, mappedResult.WorkSpaceId);
        }

        [Fact]
        public void ShouldReturnEmptyModelForNullEntityOnMapToProjectSimpleModel()
        {
            //Arrange
            var teamMapper = A.Fake<ITeamMapper>();
            var epicMapper = A.Fake<IEpicMapper>();
            
            var projectMapper = new ProjectMapper(teamMapper, epicMapper);
            
            //Act
            var result = projectMapper.MapToSimpleModel(null);

            //Assert
            Assert.NotNull(result);
        }
        
        [Fact]
        public void ShouldMapToProjectSimpleModel()
        {
            //Arrange
            var teamMapper = A.Fake<ITeamMapper>();
            var epicMapper = A.Fake<IEpicMapper>();
            
            var projectMapper = new ProjectMapper(teamMapper, epicMapper);
            
            var projectId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            const string projectName = "SomeName";
            
            var projectEntity = new Project
            {
                Id = projectId,
                ProjectName = projectName
            };

            var expectedModel = new ProjectSimpleModel
            {
                ProjectId = projectId,
                ProjectName = projectName
            };

            //Act
            var result = projectMapper.MapToSimpleModel(projectEntity);

            //Assert
            Assert.Equal(expectedModel.ProjectId, result.ProjectId);
            Assert.Equal(expectedModel.ProjectName, result.ProjectName);
        }


        private static void AssertProjectModelProperties(Models.Models.Models.Project expectedModel, Models.Models.Models.Project result)
        {
            Assert.Equal(expectedModel.ProjectId, result.ProjectId);
            Assert.Equal(expectedModel.ProjectName, result.ProjectName);
            Assert.Equal(expectedModel.ProjectDescription, result.ProjectDescription);
            Assert.Equal(expectedModel.StartDate, result.StartDate);
            Assert.Equal(expectedModel.EndDate, result.EndDate);
            Assert.Equal(expectedModel.WorkSpaceId, result.WorkSpaceId);
        }
    }
}