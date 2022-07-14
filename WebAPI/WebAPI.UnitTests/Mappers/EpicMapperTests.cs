using System;
using WebAPI.ApplicationLogic.Mappers;
using Xunit;

using EpicEntity = WebAPI.Core.Entities.Epic;
using EpicModel = WebAPI.Models.Models.Models.Epic;
using SimpleEpicModel = WebAPI.Models.Models.Simple.EpicSimpleModel;

namespace WebAPI.UnitTests.Mappers
{
    public class EpicMapperTests
    {
        [Fact]
        public void ShouldReturnEmptyModelOnNullEntity()
        {
            //Arrange & Act
            var mappedResult = EpicMapper.Map((EpicEntity)null);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyEntityOnNullModel()
        {
            //Arrange & Act
            var mappedResult = EpicMapper.Map((EpicModel)null);

            //Assert
            Assert.NotNull(mappedResult);
        }

        [Fact]
        public void ShouldMapEntityToModel()
        {
            //Arrange
            var epicId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var projectId = new Guid("1113238f-87e6-4e86-93fc-ab79b8804111");
            const string epicName = "EpicName";
            const string epicDescription = "EpicDescription";
            var startDate = DateTime.UtcNow.Date;
            var endDate = DateTime.UtcNow.Date.AddDays(2);
            const bool isDeleted = true;
            
            var epicEntity = new EpicEntity
            {
                Id = epicId,
                EpicName = epicName,
                EpicDescription = epicDescription,
                ProjectId = projectId,
                StartDate = startDate,
                EndDate = endDate,
                IsDeleted = isDeleted
            };
            
            var epicModel = new Models.Models.Models.Epic
            {
                EpicId = epicId,
                EpicName = epicName,
                EpicDescription = epicDescription,
                ProjectId = projectId,
                StartDate = startDate,
                EndDate = endDate,
                IsDeleted = isDeleted
            };
            
            //Act
            var mappedResult = EpicMapper.Map(epicEntity);
            
            //Assert
            Assert.Equal(epicModel.EpicId, mappedResult.EpicId);
            Assert.Equal(epicModel.EpicName, mappedResult.EpicName);
            Assert.Equal(epicModel.EpicDescription, mappedResult.EpicDescription);
            Assert.Equal(epicModel.ProjectId, mappedResult.ProjectId);
            Assert.Equal(epicModel.StartDate, mappedResult.StartDate);
            Assert.Equal(epicModel.EndDate, mappedResult.EndDate);
            Assert.Equal(epicModel.IsDeleted, mappedResult.IsDeleted);
        }
        
        [Fact]
        public void ShouldMapModelToEntity()
        {
            //Arrange
            var epicId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var projectId = new Guid("1113238f-87e6-4e86-93fc-ab79b8804111");
            const string epicName = "EpicName";
            const string epicDescription = "EpicDescription";
            var startDate = DateTime.UtcNow.Date;
            var endDate = DateTime.UtcNow.Date.AddDays(2);
            const bool isDeleted = true;

            var epicEntity = new EpicEntity
            {
                Id = epicId,
                EpicName = epicName,
                EpicDescription = epicDescription,
                ProjectId = projectId,
                StartDate = startDate,
                EndDate = endDate,
                IsDeleted = isDeleted
            };
            
            var epicModel = new Models.Models.Models.Epic
            {
                EpicId = epicId,
                EpicName = epicName,
                EpicDescription = epicDescription,
                ProjectId = projectId,
                StartDate = startDate,
                EndDate = endDate,
                IsDeleted = isDeleted
            };

            //Act
            var mappedResult = EpicMapper.Map(epicModel);
            
            //Assert
            Assert.Equal(epicEntity.Id, mappedResult.Id);
            Assert.Equal(epicEntity.EpicName, mappedResult.EpicName);
            Assert.Equal(epicEntity.EpicDescription, mappedResult.EpicDescription);
            Assert.Equal(epicEntity.ProjectId, mappedResult.ProjectId);
            Assert.Equal(epicEntity.StartDate, mappedResult.StartDate);
            Assert.Equal(epicEntity.EndDate, mappedResult.EndDate);
            Assert.Equal(epicEntity.IsDeleted, mappedResult.IsDeleted);
        }

        [Fact]
        public void ShouldReturnEmptyModelForNullEntityOnMapToEpicSimpleModel()
        {
            //Arrange & Act
            var result = EpicMapper.MapToSimpleModel(null);

            //Assert
            Assert.NotNull(result);
        }
        
        [Fact]
        public void ShouldMapToEpicSimpleModel()
        {
            //Arrange
            var epicId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            const string epicName = "EpicName";
            var startDate = DateTime.UtcNow.Date;
            var endDate = DateTime.UtcNow.Date.AddDays(2);

            var epicEntity = new EpicEntity
            {
                Id = epicId,
                EpicName = epicName,
                EpicDescription = "Decs",
                StartDate = startDate,
                EndDate = endDate
            };

            var expectedModel = new SimpleEpicModel
            {
                EpicId = epicId,
                EpicName = epicName,
                StartDate = startDate,
                EndDate = endDate,
            };

            //Act
            var result = EpicMapper.MapToSimpleModel(epicEntity);

            //Assert
            Assert.Equal(expectedModel.EpicId, result.EpicId);
            Assert.Equal(expectedModel.EpicName, result.EpicName);
            Assert.Equal(expectedModel.StartDate, result.StartDate);
            Assert.Equal(expectedModel.EndDate, result.EndDate);
        }
    }
}