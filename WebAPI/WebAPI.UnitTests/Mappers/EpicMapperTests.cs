using System;
using FakeItEasy;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Presentation.Mappers;
using Xunit;

namespace WebAPI.UnitTests.Mappers
{
    public class EpicMapperTests
    {
        [Fact]
        public void ShouldReturnEmptyModelOnNullEntity()
        {
            //Arrange
            var sprintMapper = A.Fake<ISprintMapper>();

            Epic epicEntity = null;
            
            //Act
            var epicMapper = new EpicMapper(sprintMapper);
            var mappedResult = epicMapper.MapToModel(epicEntity);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyEntityOnNullModel()
        {
            //Arrange
            var sprintMapper = A.Fake<ISprintMapper>();

            Models.Models.Epic epicModel = null;
            
            //Act
            var epicMapper = new EpicMapper(sprintMapper);
            var mappedResult = epicMapper.MapToEntity(epicModel);

            //Assert
            Assert.NotNull(mappedResult);
        }

        [Fact]
        public void ShouldMapEntityToModel()
        {
            //Arrange
            var sprintMapper = A.Fake<ISprintMapper>();

            var epicId = new Guid();
            
            var epicEntity = new Epic
            {
                Id = epicId,
                EpicName = "TestName",
                EpicDescription = "SomeDecs",
                ProjectId = new Guid(),
                StartDate = new DateTime(2020, 11, 12),
                EndDate = new DateTime(2020, 11, 22),
            };
            
            var epicModel = new Models.Models.Epic
            {
                EpicId = epicId,
                EpicName = "TestName",
                EpicDescription = "SomeDecs",
                StartDate = new DateTime(2020, 11, 12),
                EndDate = new DateTime(2020, 11, 22),
            };
            
            //Act
            var epicMapper = new EpicMapper(sprintMapper);
            var mappedResult = epicMapper.MapToModel(epicEntity);
            
            //Assert
            Assert.Equal(epicModel.EpicId, mappedResult.EpicId);
            Assert.Equal(epicModel.EpicName, mappedResult.EpicName);
            Assert.Equal(epicModel.StartDate, mappedResult.StartDate);
            Assert.Equal(epicModel.EndDate, mappedResult.EndDate);
            Assert.Equal(epicModel.EpicDescription, mappedResult.EpicDescription);
        }
        
        [Fact]
        public void ShouldMapModelToEntity()
        {
            //Arrange
            var sprintMapper = A.Fake<ISprintMapper>();

            var epicId = new Guid();
            
            var epicEntity = new Epic
            {
                Id = epicId,
                EpicName = "Name",
                EpicDescription = "Decs",
                ProjectId = new Guid(),
                StartDate = new DateTime(2020, 10, 12),
                EndDate = new DateTime(2020, 10, 22),
            };
            
            var epicModel = new Models.Models.Epic
            {
                EpicId = epicId,
                EpicName = "Name",
                EpicDescription = "Decs",
                StartDate = new DateTime(2020, 10, 12),
                EndDate = new DateTime(2020, 10, 22),
            };
            
            //Act
            var epicMapper = new EpicMapper(sprintMapper);
            var mappedResult = epicMapper.MapToEntity(epicModel);
            
            //Assert
            Assert.Equal(epicEntity.Id, mappedResult.Id);
            Assert.Equal(epicEntity.EpicName, mappedResult.EpicName);
            Assert.Equal(epicEntity.StartDate, mappedResult.StartDate);
            Assert.Equal(epicEntity.EndDate, mappedResult.EndDate);
            Assert.Equal(epicEntity.EpicDescription, mappedResult.EpicDescription);
        }
    }
}