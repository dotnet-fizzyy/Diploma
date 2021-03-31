using System;
using FakeItEasy;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Presentation.Mappers;
using Xunit;

namespace WebAPI.UnitTests.Mappers
{
    public class SprintMapperTests
    {
        [Fact]
        public void ShouldReturnEmptyModelOnNullEntity()
        {
            //Arrange
            var storyMapper = A.Fake<IStoryMapper>();

            //Act
            var sprintMapper = new SprintMapper(storyMapper);
            var mappedResult = sprintMapper.MapToModel(null);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyEntityOnNullModel()
        {
            //Arrange
            var storyMapper = A.Fake<IStoryMapper>();

            //Act
            var sprintMapper = new SprintMapper(storyMapper);
            var mappedResult = sprintMapper.MapToEntity(null);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldMapEntityToModel()
        {
            //Arrange
            var storyMapper = A.Fake<IStoryMapper>();

            var sprintId = new Guid();
            var epicId = new Guid();
            
            var sprintEntity = new Sprint
            {
                Id = sprintId,
                SprintName = "SprintName",
                StartDate = new DateTime(2020, 11, 11),
                EndDate = new DateTime(2020, 11, 22),
                EpicId = epicId,
            };

            var sprintModel = new Models.Models.Sprint
            {
                SprintId = sprintId,
                SprintName = "SprintName",
                StartDate = new DateTime(2020, 11, 11),
                EndDate = new DateTime(2020, 11, 22),
                EpicId = epicId,
            };
            
            //Act
            var sprintMapper = new SprintMapper(storyMapper);
            var mappedResult = sprintMapper.MapToModel(sprintEntity);

            //Assert
            Assert.Equal(sprintModel.SprintId, mappedResult.SprintId);
            Assert.Equal(sprintModel.SprintName, mappedResult.SprintName);
            Assert.Equal(sprintModel.StartDate, mappedResult.StartDate);
            Assert.Equal(sprintModel.EndDate, mappedResult.EndDate);
            Assert.Equal(sprintModel.EpicId, mappedResult.EpicId);
        }
        
        [Fact]
        public void ShouldMapModelToEntity()
        {
            //Arrange
            var storyMapper = A.Fake<IStoryMapper>();

            var sprintId = new Guid();
            var epicId = new Guid();
            
            var sprintModel = new Models.Models.Sprint
            {
                SprintId = sprintId,
                SprintName = "Sprint",
                StartDate = new DateTime(2020, 12, 11),
                EndDate = new DateTime(2020, 12, 22),
                EpicId = epicId,
            };
            
            var sprintEntity = new Sprint
            {
                Id = sprintId,
                SprintName = "Sprint",
                StartDate = new DateTime(2020, 12, 11),
                EndDate = new DateTime(2020, 12, 22),
                EpicId = epicId,
            };
            
            //Act
            var sprintMapper = new SprintMapper(storyMapper);
            var mappedResult = sprintMapper.MapToEntity(sprintModel);

            //Assert
            Assert.Equal(sprintEntity.Id, mappedResult.Id);
            Assert.Equal(sprintEntity.SprintName, mappedResult.SprintName);
            Assert.Equal(sprintEntity.StartDate, mappedResult.StartDate);
            Assert.Equal(sprintEntity.EndDate, mappedResult.EndDate);
            Assert.Equal(sprintEntity.EpicId, mappedResult.EpicId);
        }
    }
}