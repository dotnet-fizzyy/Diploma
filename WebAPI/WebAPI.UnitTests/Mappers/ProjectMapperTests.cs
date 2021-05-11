using System;
using WebAPI.Core.Entities;
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
            var projectMapper = new ProjectMapper();
            
            //Act
            var mappedResult = projectMapper.MapToModel(null);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyEntityOnNullModel()
        {
            //Arrange
            var projectMapper = new ProjectMapper();
            
            //Act
            var mappedResult = projectMapper.MapToEntity(null);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldMapEntityToModel()
        {
            //Arrange
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
            
            var projectMapper = new ProjectMapper();
            
            //Act
            var mappedResult = projectMapper.MapToModel(projectEntity);

            //Assert
            AssertProjectModelProperties(expectedModel, mappedResult);
        }

        [Fact]
        public void ShouldMapToProjectSimpleModel()
        {
            //Arrange
            var projectMapper = new ProjectMapper();
            
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