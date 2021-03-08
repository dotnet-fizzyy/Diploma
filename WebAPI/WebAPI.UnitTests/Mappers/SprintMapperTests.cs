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
    public class SprintMapperTests
    {
        [Fact]
        public void ShouldReturnEmptyModelOnNullEntity()
        {
            //Arrange
            var storyMapper = A.Fake<IStoryMapper>();

            Sprint sprintEntity = null;
            
            //Act
            var sprintMapper = new SprintMapper(storyMapper);
            var mappedResult = sprintMapper.MapToModel(sprintEntity);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyEntityOnNullModel()
        {
            //Arrange
            var storyMapper = A.Fake<IStoryMapper>();

            Models.Models.Sprint sprintModel = null;
            
            //Act
            var sprintMapper = new SprintMapper(storyMapper);
            var mappedResult = sprintMapper.MapToEntity(sprintModel);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyFullModelOnNullEntity()
        {
            //Arrange
            var storyMapper = A.Fake<IStoryMapper>();

            Sprint sprintEntity = null;
            
            //Act
            var sprintMapper = new SprintMapper(storyMapper);
            var mappedResult = sprintMapper.MapToFullModel(sprintEntity);

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
                Progress = 100
            };

            var sprintModel = new Models.Models.Sprint
            {
                SprintId = sprintId,
                SprintName = "SprintName",
                StartDate = new DateTime(2020, 11, 11),
                EndDate = new DateTime(2020, 11, 22),
                EpicId = epicId,
                Progress = 100
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
            Assert.Equal(sprintModel.Progress, mappedResult.Progress);
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
                Progress = 50
            };
            
            var sprintEntity = new Sprint
            {
                Id = sprintId,
                SprintName = "Sprint",
                StartDate = new DateTime(2020, 12, 11),
                EndDate = new DateTime(2020, 12, 22),
                EpicId = epicId,
                Progress = 50
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
            Assert.Equal(sprintEntity.Progress, mappedResult.Progress);
        }
        
        [Fact]
        public void ShouldMapEntityToFullModel()
        {
            //Arrange
            var storyMapper = A.Fake<IStoryMapper>();

            var sprintId = new Guid();
            var epicId = new Guid();
            var storyId = new Guid();

            var sprintEntity = new Sprint
            {
                Id = sprintId,
                SprintName = "Sprint",
                StartDate = new DateTime(2020, 12, 11),
                EndDate = new DateTime(2020, 12, 22),
                EpicId = epicId,
                Progress = 50,
                Stories = new List<Story>
                {
                    new Story
                    {
                        Id = storyId,
                        SprintId = sprintId
                    }
                }
            };
            
            var sprintFullModel = new Models.Result.FullSprint
            {
                SprintId = sprintId,
                SprintName = "Sprint",
                StartDate = new DateTime(2020, 12, 11),
                EndDate = new DateTime(2020, 12, 22),
                EpicId = epicId,
                Progress = 50,
                Stories = new List<Models.Models.Story>
                {
                    new Models.Models.Story
                    {
                        StoryId = storyId,
                        SprintId = sprintId
                    }
                }
            };
            
            //Act
            A.CallTo(() => storyMapper.MapToModel(sprintEntity.Stories.First()))
                .Returns(sprintFullModel.Stories.First());
            
            var sprintMapper = new SprintMapper(storyMapper);
            var mappedResult = sprintMapper.MapToFullModel(sprintEntity);

            //Assert
            Assert.Equal(sprintFullModel.SprintId, mappedResult.SprintId);
            Assert.Equal(sprintFullModel.SprintName, mappedResult.SprintName);
            Assert.Equal(sprintFullModel.StartDate, mappedResult.StartDate);
            Assert.Equal(sprintFullModel.EndDate, mappedResult.EndDate);
            Assert.Equal(sprintFullModel.EpicId, mappedResult.EpicId);
            Assert.Equal(sprintFullModel.Progress, mappedResult.Progress);
            Assert.All(mappedResult.Stories, story =>
            {
                Assert.Equal(sprintFullModel.Stories.First().StoryId, story.StoryId);
                Assert.Equal(sprintFullModel.Stories.First().SprintId, story.SprintId);
            });

            A.CallTo(() => storyMapper.MapToModel(sprintEntity.Stories.First()))
                .MustHaveHappened();
        }
    }
}