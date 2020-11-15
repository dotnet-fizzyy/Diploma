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
        public void ShouldReturnEmptyFullModelOnNullEntity()
        {
            //Arrange
            var sprintMapper = A.Fake<ISprintMapper>();

            Epic epicEntity = null;
            
            //Act
            var epicMapper = new EpicMapper(sprintMapper);
            var mappedResult = epicMapper.MapToFullModel(epicEntity);

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
                EpicId = epicId,
                EpicName = "TestName",
                EpicDescription = "SomeDecs",
                ProjectId = new Guid(),
                StartDate = new DateTime(2020, 11, 12),
                EndDate = new DateTime(2020, 11, 22),
                Progress = 50.3
            };
            
            var epicModel = new Models.Models.Epic
            {
                EpicId = epicId,
                EpicName = "TestName",
                EpicDescription = "SomeDecs",
                StartDate = new DateTime(2020, 11, 12),
                EndDate = new DateTime(2020, 11, 22),
                Progress = 50.3
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
            Assert.Equal(epicModel.Progress, mappedResult.Progress);
        }
        
        [Fact]
        public void ShouldMapModelToEntity()
        {
            //Arrange
            var sprintMapper = A.Fake<ISprintMapper>();

            var epicId = new Guid();
            
            var epicEntity = new Epic
            {
                EpicId = epicId,
                EpicName = "Name",
                EpicDescription = "Decs",
                ProjectId = new Guid(),
                StartDate = new DateTime(2020, 10, 12),
                EndDate = new DateTime(2020, 10, 22),
                Progress = 80
            };
            
            var epicModel = new Models.Models.Epic
            {
                EpicId = epicId,
                EpicName = "Name",
                EpicDescription = "Decs",
                StartDate = new DateTime(2020, 10, 12),
                EndDate = new DateTime(2020, 10, 22),
                Progress = 80
            };
            
            //Act
            var epicMapper = new EpicMapper(sprintMapper);
            var mappedResult = epicMapper.MapToEntity(epicModel);
            
            //Assert
            Assert.Equal(epicEntity.EpicId, mappedResult.EpicId);
            Assert.Equal(epicEntity.EpicName, mappedResult.EpicName);
            Assert.Equal(epicEntity.StartDate, mappedResult.StartDate);
            Assert.Equal(epicEntity.EndDate, mappedResult.EndDate);
            Assert.Equal(epicEntity.EpicDescription, mappedResult.EpicDescription);
            Assert.Equal(epicEntity.Progress, mappedResult.Progress);
        }
        
        [Fact]
        public void ShouldMapEntityToFullModel()
        {
            //Arrange
            var sprintMapper = A.Fake<ISprintMapper>();

            var epicId = new Guid();
            var sprintId = new Guid();
            
            var epicEntity = new Epic
            {
                EpicId = epicId,
                EpicName = "Name",
                EpicDescription = "Decs",
                ProjectId = new Guid(),
                StartDate = new DateTime(2020, 10, 12),
                EndDate = new DateTime(2020, 10, 22),
                Progress = 80,
                Sprints = new List<Sprint>
                {
                    new Sprint
                    {
                        SprintId = sprintId,
                        SprintName = "Sprint",
                        EpicId = epicId,
                        StartDate = new DateTime(2020, 10, 12),
                        EndDate = new DateTime(2020, 10, 22),
                        Progress = 100
                    }
                }
            };
            
            var epicModel = new Models.Result.FullEpic
            {
                EpicId = epicId,
                EpicName = "Name",
                EpicDescription = "Decs",
                StartDate = new DateTime(2020, 10, 12),
                EndDate = new DateTime(2020, 10, 22),
                Progress = 80,
                Sprints = new List<Models.Models.Sprint>
                {
                    new Models.Models.Sprint
                    {
                        SprintId = sprintId,
                        SprintName = "Sprint",
                        StartDate = new DateTime(2020, 10, 12),
                        EndDate = new DateTime(2020, 10, 22),
                        Progress = 100
                    }
                }
            };
            
            //Act
            A.CallTo(() => sprintMapper.MapToModel(epicEntity.Sprints.First()))
                .Returns(epicModel.Sprints.First());
            
            var epicMapper = new EpicMapper(sprintMapper);
            var mappedResult = epicMapper.MapToFullModel(epicEntity);
            
            //Assert
            Assert.Equal(epicModel.EpicId, mappedResult.EpicId);
            Assert.Equal(epicModel.EpicName, mappedResult.EpicName);
            Assert.Equal(epicModel.StartDate, mappedResult.StartDate);
            Assert.Equal(epicModel.EndDate, mappedResult.EndDate);
            Assert.Equal(epicModel.EpicDescription, mappedResult.EpicDescription);
            Assert.Equal(epicModel.Progress, mappedResult.Progress);
            Assert.All(epicModel.Sprints, sprint =>
            {
                Assert.Equal(epicModel.Sprints.First().SprintId, mappedResult.Sprints.First().SprintId);
                Assert.Equal(epicModel.Sprints.First().SprintName, mappedResult.Sprints.First().SprintName);
                Assert.Equal(epicModel.Sprints.First().StartDate, mappedResult.Sprints.First().StartDate);
                Assert.Equal(epicModel.Sprints.First().EndDate, mappedResult.Sprints.First().EndDate);
                Assert.Equal(epicModel.Sprints.First().Progress, mappedResult.Sprints.First().Progress);
            });

            A.CallTo(() => sprintMapper.MapToModel(epicEntity.Sprints.First()))
                .MustHaveHappened();
        }
    }
}