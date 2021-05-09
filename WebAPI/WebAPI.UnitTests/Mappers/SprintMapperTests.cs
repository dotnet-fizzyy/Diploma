using System;
using System.Collections.Generic;
using FakeItEasy;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Models.Result;
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

            var sprintMapper = new SprintMapper(storyMapper);
            
            //Act
            var mappedResult = sprintMapper.MapToModel(null);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyEntityOnNullModel()
        {
            //Arrange
            var storyMapper = A.Fake<IStoryMapper>();

            var sprintMapper = new SprintMapper(storyMapper);
            
            //Act
            var mappedResult = sprintMapper.MapToEntity(null);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldMapEntityToModel()
        {
            //Arrange
            var storyMapper = A.Fake<IStoryMapper>();

            var sprintId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var epicId = new Guid("1b7572ee-eb5b-4094-bd5e-e2191090c444");
            const string sprintName = "SprintName";
            var startDate = DateTime.UtcNow;
            var endDate = DateTime.UtcNow.AddDays(2);
            
            var sprintEntity = new Sprint
            {
                Id = sprintId,
                SprintName = sprintName,
                StartDate = startDate,
                EndDate = endDate,
                EpicId = epicId,
            };

            var sprintModel = new Models.Models.Models.Sprint
            {
                SprintId = sprintId,
                SprintName = sprintName,
                StartDate = startDate,
                EndDate = endDate,
                EpicId = epicId,
            };
            
            var sprintMapper = new SprintMapper(storyMapper);
            
            //Act
            var mappedResult = sprintMapper.MapToModel(sprintEntity);

            //Assert
            AssertSprintModelProperties(sprintModel, mappedResult);
        }
        
        [Fact]
        public void ShouldMapModelToEntity()
        {
            //Arrange
            var storyMapper = A.Fake<IStoryMapper>();

            var sprintId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var epicId = new Guid("1b7572ee-eb5b-4094-bd5e-e2191090c444");
            const string sprintName = "SprintName";
            var startDate = DateTime.UtcNow;
            var endDate = DateTime.UtcNow.AddDays(2);
            
            var sprintModel = new Models.Models.Models.Sprint
            {
                SprintId = sprintId,
                SprintName = sprintName,
                StartDate = startDate,
                EndDate = endDate,
                EpicId = epicId,
            };
            
            var sprintEntity = new Sprint
            {
                Id = sprintId,
                SprintName = sprintName,
                StartDate = startDate,
                EndDate = endDate,
                EpicId = epicId,
            };
            
            var sprintMapper = new SprintMapper(storyMapper);
            
            //Act
            var mappedResult = sprintMapper.MapToEntity(sprintModel);

            //Assert
            Assert.Equal(sprintEntity.Id, mappedResult.Id);
            Assert.Equal(sprintEntity.SprintName, mappedResult.SprintName);
            Assert.Equal(sprintEntity.StartDate, mappedResult.StartDate);
            Assert.Equal(sprintEntity.EndDate, mappedResult.EndDate);
            Assert.Equal(sprintEntity.EpicId, mappedResult.EpicId);
        }

        [Fact]
        public void ShouldMapToSprintFullModel()
        {
            //Arrange
            var sprintId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var epicId = new Guid("1b7572ee-eb5b-4094-bd5e-e2191090c444");
            const string sprintName = "SprintName";
            var startDate = DateTime.UtcNow;
            var endDate = DateTime.UtcNow.AddDays(2);

            var storyId = new Guid("777572ee-eb5b-4094-bd5e-e2191090c444");
            const string storyTitle = "StoryTitle";
            
            var sprintEntity = new Sprint
            {
                Id = sprintId,
                SprintName = sprintName,
                StartDate = startDate,
                EndDate = endDate,
                EpicId = epicId,
                Stories = new List<Story>
                {
                    new Story
                    {
                        Id = storyId,
                        Title = storyTitle,
                    }
                }
            };
            
            var expectedModel = new FullSprint
            {
                SprintId = sprintId,
                SprintName = sprintName,
                StartDate = startDate,
                EndDate = endDate,
                EpicId = epicId,
                Stories = new List<Models.Models.Models.Story>
                {
                    new Models.Models.Models.Story
                    {
                        StoryId = storyId,
                        Title = storyTitle,
                    }
                }
            };

            var sprintMapper = new SprintMapper(new StoryMapper(new StoryHistoryMapper()));
            
            //Act
            var mappedResult = sprintMapper.MapToFullModel(sprintEntity);

            //Assert
            AssertSprintModelProperties(expectedModel, mappedResult);
            
            Assert.Equal(expectedModel.Stories.Count, mappedResult.Stories.Count);
            Assert.Equal(expectedModel.Stories[0].StoryId, mappedResult.Stories[0].StoryId);
            Assert.Equal(expectedModel.Stories[0].Title, mappedResult.Stories[0].Title);
        }

        private static void AssertSprintModelProperties(Models.Models.Models.Sprint expectedModel, Models.Models.Models.Sprint mappedResult)
        {
            Assert.Equal(expectedModel.SprintId, mappedResult.SprintId);
            Assert.Equal(expectedModel.SprintName, mappedResult.SprintName);
            Assert.Equal(expectedModel.StartDate, mappedResult.StartDate);
            Assert.Equal(expectedModel.EndDate, mappedResult.EndDate);
            Assert.Equal(expectedModel.EpicId, mappedResult.EpicId);
        }
    }
}