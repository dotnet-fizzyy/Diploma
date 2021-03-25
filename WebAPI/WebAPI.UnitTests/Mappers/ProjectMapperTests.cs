using System;
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

            //Act
            var projectMapper = new ProjectMapper(teamMapper, epicMapper);
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

            //Act
            var projectMapper = new ProjectMapper(teamMapper, epicMapper);
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
            
            var projectId = new Guid();
            
            var projectEntity = new Project
            {
                Id = projectId,
                ProjectName = "Name",
                ProjectDescription = "Description",
                StartDate = new DateTime(2020, 11, 11),
                EndDate = new DateTime(2020, 11, 19),
                WorkSpaceId = new Guid("1b7572ee-eb5b-4094-bd5e-e2191090c444")
            };

            var projectModel = new Models.Models.Project
            {
                ProjectId = projectId,
                ProjectName = "Name",
                ProjectDescription = "Description",
                StartDate = new DateTime(2020, 11, 11),
                EndDate = new DateTime(2020, 11, 19),
                WorkSpaceId = new Guid("1b7572ee-eb5b-4094-bd5e-e2191090c444")
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
            Assert.Equal(projectModel.WorkSpaceId, mappedResult.WorkSpaceId);
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
                WorkSpaceId = new Guid("1b7572ee-eb5b-4094-bd5e-e2191090c444")
            };

            var projectModel = new Models.Models.Project
            {
                ProjectId = projectId,
                ProjectName = "SomeName",
                ProjectDescription = "Desc",
                StartDate = new DateTime(2020, 11, 11),
                EndDate = new DateTime(2020, 11, 19),
                WorkSpaceId = new Guid("1b7572ee-eb5b-4094-bd5e-e2191090c444")
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
            Assert.Equal(projectEntity.WorkSpaceId, mappedResult.WorkSpaceId);
        }
    }
}