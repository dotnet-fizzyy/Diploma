using System;
using WebAPI.ApplicationLogic.Mappers;
using Xunit;

using ProjectEntity = WebAPI.Core.Entities.Project;
using ProjectModel = WebAPI.Models.Models.Models.Project;
using ProjectSimpleModel = WebAPI.Models.Models.Simple.ProjectSimpleModel;

namespace WebAPI.UnitTests.Mappers
{
    public class ProjectMapperTests
    {
        [Fact]
        public void ShouldReturnEmptyModelOnNullEntity()
        {
            //Arrange & Act
            var mappedResult = ProjectMapper.Map((ProjectEntity)null);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyEntityOnNullModel()
        {
            //Arrange & Act
            var mappedResult = ProjectMapper.Map((ProjectModel)null);

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
            const bool isDeleted = true;
            
            var projectEntity = new ProjectEntity
            {
                Id = projectId,
                ProjectName = projectName,
                ProjectDescription = projectDescription,
                StartDate = startDate,
                EndDate = endDate,
                WorkSpaceId = workSpaceId,
                IsDeleted = isDeleted
            };

            var expectedModel = new ProjectModel
            {
                ProjectId = projectId,
                ProjectName = projectName,
                ProjectDescription = projectDescription,
                StartDate = startDate,
                EndDate = endDate,
                WorkSpaceId = workSpaceId,
                IsDeleted = isDeleted
            };

            //Act
            var mappedResult = ProjectMapper.Map(projectEntity);

            //Assert
            AssertProjectModelProperties(expectedModel, mappedResult);
        }

        [Fact]
        public void ShouldMapModelToEntity()
        {
            //Arrange
            var projectId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var workSpaceId = new Guid("1b7572ee-eb5b-4094-bd5e-e2191090c444");
            const string projectName = "SomeName";
            const string projectDescription = "SomeDescription";
            var startDate = DateTime.UtcNow.Date;
            var endDate = DateTime.UtcNow.Date.AddDays(2);
            const bool isDeleted = true;
            
            var expectedEntity = new ProjectEntity
            {
                Id = projectId,
                ProjectName = projectName,
                ProjectDescription = projectDescription,
                StartDate = startDate,
                EndDate = endDate,
                WorkSpaceId = workSpaceId,
                IsDeleted = isDeleted
            };

            var projectModel = new ProjectModel
            {
                ProjectId = projectId,
                ProjectName = projectName,
                ProjectDescription = projectDescription,
                StartDate = startDate,
                EndDate = endDate,
                WorkSpaceId = workSpaceId,
                IsDeleted = isDeleted
            };

            //Act
            var mappedResult = ProjectMapper.Map(projectModel);

            //Assert
            Assert.Equal(expectedEntity.Id, mappedResult.Id);
            Assert.Equal(expectedEntity.ProjectName, mappedResult.ProjectName);
            Assert.Equal(expectedEntity.ProjectDescription, mappedResult.ProjectDescription);
            Assert.Equal(expectedEntity.StartDate, mappedResult.StartDate);
            Assert.Equal(expectedEntity.EndDate, mappedResult.EndDate);
            Assert.Equal(expectedEntity.WorkSpaceId, mappedResult.WorkSpaceId);
            Assert.Equal(expectedEntity.IsDeleted, mappedResult.IsDeleted);
        }
        
        [Fact]
        public void ShouldMapToProjectSimpleModel()
        {
            //Arrange
            var projectId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            const string projectName = "SomeName";
            
            var projectEntity = new ProjectEntity
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
            var result = ProjectMapper.MapToSimpleModel(projectEntity);

            //Assert
            Assert.Equal(expectedModel.ProjectId, result.ProjectId);
            Assert.Equal(expectedModel.ProjectName, result.ProjectName);
        }


        private static void AssertProjectModelProperties(ProjectModel expectedModel, ProjectModel result)
        {
            Assert.Equal(expectedModel.ProjectId, result.ProjectId);
            Assert.Equal(expectedModel.ProjectName, result.ProjectName);
            Assert.Equal(expectedModel.ProjectDescription, result.ProjectDescription);
            Assert.Equal(expectedModel.StartDate, result.StartDate);
            Assert.Equal(expectedModel.EndDate, result.EndDate);
            Assert.Equal(expectedModel.WorkSpaceId, result.WorkSpaceId);
            Assert.Equal(expectedModel.IsDeleted, result.IsDeleted);
        }
    }
}