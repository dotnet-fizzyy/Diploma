using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using FakeItEasy;
using WebAPI.ApplicationLogic.Services;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;
using Xunit;

namespace WebAPI.UnitTests.Services
{
    public class SprintServiceTests
    {
        [Fact]
        public async Task ShouldGetSprintByIdAsync()
        {
            //Arrange
            var sprintRepository = A.Fake<ISprintRepository>();

            var sprintService = new SprintService(sprintRepository);
            
            var sprintId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var epicId = new Guid("5593238f-87e6-4e86-93fc-ab79b8804444");
            const string sprintName = "TeamName";
            var startDate = DateTime.UtcNow;
            var endDate = DateTime.UtcNow.AddDays(2);
            var creationDate = DateTime.UtcNow;

            var entity = new Core.Entities.Sprint
            {
                Id = sprintId,
                EpicId = epicId,
                SprintName = sprintName,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate
            };
            
            var expectedModel = new Sprint
            {
                SprintId = sprintId,
                EpicId = epicId,
                SprintName = sprintName,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate
            };

            A.CallTo(() => sprintRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Sprint, bool>>>._))
                .Returns(entity);
            
            //Act
            var result = await sprintService.GetByIdAsync(sprintId);

            //Assert
            AssertSprintModelProperties(expectedModel, result);
            
            A.CallTo(() => sprintRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Sprint, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task ShouldThrowErrorForMissingEntityGetSprintByIdAsync()
        {
            //Arrange
            var sprintRepository = A.Fake<ISprintRepository>();

            var sprintService = new SprintService(sprintRepository);
            
            var sprintId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");

            A.CallTo(() => sprintRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Sprint, bool>>>._))
                .Returns((Core.Entities.Sprint)null);
            
            //Act && Assert
            await Assert.ThrowsAsync<UserFriendlyException>(async () => await sprintService.GetByIdAsync(sprintId));
            
            A.CallTo(() => sprintRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Sprint, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldGetFullSprintDescriptionOnGetByIdAsync()
        {
            //Arrange
            var sprintRepository = A.Fake<ISprintRepository>();

            var sprintService = new SprintService(sprintRepository);
            
            var sprintId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var epicId = new Guid("5593238f-87e6-4e86-93fc-ab79b8804444");
            var storyId = new Guid("0093238f-87e6-4e86-93fc-ab79b8800000");
            const string sprintName = "TeamName";
            const string storyName = "StoryName";
            var startDate = DateTime.UtcNow;
            var endDate = DateTime.UtcNow.AddDays(2);
            var creationDate = DateTime.UtcNow;

            var entity = new Core.Entities.Sprint
            {
                Id = sprintId,
                EpicId = epicId,
                SprintName = sprintName,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate,
                Stories = new List<Core.Entities.Story>
                {
                    new Core.Entities.Story
                    {
                        Id = storyId,
                        SprintId = sprintId,
                        Title = storyName,
                    }     
                },
            };
            
            var expectedModel = new FullSprint
            {
                SprintId = sprintId,
                EpicId = epicId,
                SprintName = sprintName,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate,
                Stories = new List<Story>
                {
                    new Story
                    {
                        StoryId = storyId,
                        SprintId = sprintId,
                        Title = storyName,
                    }     
                },
            };

            A.CallTo(() => sprintRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Sprint, bool>>>._, A<Expression<Func<Core.Entities.Sprint, object>>>._))
                .Returns(entity);
            
            //Act
            var result = await sprintService.GetFullSprintAsync(sprintId);

            //Assert
            AssertSprintModelProperties(expectedModel, result);
            
            Assert.Equal(expectedModel.Stories.Count, result.Stories.Count);
            Assert.Equal(expectedModel.Stories[0].StoryId, result.Stories[0].StoryId);
            Assert.Equal(expectedModel.Stories[0].Title, result.Stories[0].Title);
            Assert.Equal(expectedModel.Stories[0].SprintId, result.Stories[0].SprintId);
            
            A.CallTo(() => sprintRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Sprint, bool>>>._, A<Expression<Func<Core.Entities.Sprint, object>>>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldThrowErrorForMissingEntityOnGetFullSprintDescriptionByIdAsync()
        {
            //Arrange
            var sprintRepository = A.Fake<ISprintRepository>();

            var sprintService = new SprintService(sprintRepository);
            
            var sprintId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");

            A.CallTo(() => sprintRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Sprint, bool>>>._, A<Expression<Func<Core.Entities.Sprint, object>>>._))
                .Returns((Core.Entities.Sprint)null);
            
            //Act && Assert
            await Assert.ThrowsAsync<UserFriendlyException>(async () => await sprintService.GetFullSprintAsync(sprintId));

            A.CallTo(() => sprintRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Sprint, bool>>>._, A<Expression<Func<Core.Entities.Sprint, object>>>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldGetAllSprintsFromEpicAsync()
        {
            //Arrange
            var sprintRepository = A.Fake<ISprintRepository>();

            var sprintService = new SprintService(sprintRepository);
            
            var sprintId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var epicId = new Guid("5593238f-87e6-4e86-93fc-ab79b8804444");
            const string sprintName = "TeamName";
            var startDate = DateTime.UtcNow;
            var endDate = DateTime.UtcNow.AddDays(2);
            var creationDate = DateTime.UtcNow;

            var entities = new List<Core.Entities.Sprint>
            {
                new Core.Entities.Sprint
                {
                    Id = sprintId,
                    EpicId = epicId,
                    SprintName = sprintName,
                    StartDate = startDate,
                    EndDate = endDate,
                    CreationDate = creationDate
                }
            };

            var expectedModels = new CollectionResponse<Sprint>
            {
                Items = new List<Sprint>
                {
                    new Sprint
                    {
                        SprintId = sprintId,
                        EpicId = epicId,
                        SprintName = sprintName,
                        StartDate = startDate,
                        EndDate = endDate,
                        CreationDate = creationDate
                    }
                }
            };

            A.CallTo(() => sprintRepository.GetFullSprintsByEpicId(A<Guid>._, null))
                .Returns(entities);
            
            //Act
            var result = await sprintService.GetAllSprintsFromEpicAsync(epicId, null);

            //Assert
            Assert.Equal(expectedModels.Count, result.Count);
            
            AssertSprintModelProperties(expectedModels.Items[0], result.Items[0]);
            
            A.CallTo(() => sprintRepository.GetFullSprintsByEpicId(A<Guid>._, null))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldReturnEmptyCollectionForMissingEntityOnGetAllSprintsFromEpicAsync()
        {
            //Arrange
            var sprintRepository = A.Fake<ISprintRepository>();

            var sprintService = new SprintService(sprintRepository);
            
            var epicId = new Guid("5593238f-87e6-4e86-93fc-ab79b8804444");

            A.CallTo(() => sprintRepository.GetFullSprintsByEpicId(A<Guid>._, null))
                .Returns(new List<Core.Entities.Sprint>());
            
            //Act
            var result = await sprintService.GetAllSprintsFromEpicAsync(epicId, null);

            //Assert
            Assert.NotNull(result.Items);
            Assert.Empty(result.Items);
            
            A.CallTo(() => sprintRepository.GetFullSprintsByEpicId(A<Guid>._, null))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldCreateSprintAsync()
        {
            //Arrange
            var sprintRepository = A.Fake<ISprintRepository>();

            var sprintService = new SprintService(sprintRepository);
            
            var sprintId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var epicId = new Guid("5593238f-87e6-4e86-93fc-ab79b8804444");
            const string sprintName = "TeamName";
            var startDate = DateTime.UtcNow;
            var endDate = DateTime.UtcNow.AddDays(2);
            var creationDate = DateTime.UtcNow;

            var model = new Sprint
            {
                EpicId = epicId,
                SprintName = sprintName,
                StartDate = startDate,
                EndDate = endDate,
            };
            
            var entity = new Core.Entities.Sprint
            {
                Id = sprintId,
                EpicId = epicId,
                SprintName = sprintName,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate
            };
            
            var expectedModel = new Sprint
            {
                SprintId = sprintId,
                EpicId = epicId,
                SprintName = sprintName,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate
            };

            A.CallTo(() => sprintRepository.CreateAsync(A<Core.Entities.Sprint>._))
                .Returns(entity);
            
            //Act
            var result = await sprintService.CreateAsync(model);

            //Assert
            AssertSprintModelProperties(expectedModel, result);
            
            A.CallTo(() => sprintRepository.CreateAsync(A<Core.Entities.Sprint>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldUpdateSprintAsync()
        {
            //Arrange
            var sprintRepository = A.Fake<ISprintRepository>();

            var sprintService = new SprintService(sprintRepository);
            
            var sprintId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var epicId = new Guid("5593238f-87e6-4e86-93fc-ab79b8804444");
            const string sprintName = "TeamName";
            var startDate = DateTime.UtcNow;
            var endDate = DateTime.UtcNow.AddDays(2);
            var creationDate = DateTime.UtcNow;

            var model = new Sprint
            {
                SprintId = sprintId,
                EpicId = epicId,
                SprintName = sprintName,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate
            };
            
            var entity = new Core.Entities.Sprint
            {
                Id = sprintId,
                EpicId = epicId,
                SprintName = sprintName,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate
            };
            
            var expectedModel = new Sprint
            {
                SprintId = sprintId,
                EpicId = epicId,
                SprintName = sprintName,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate
            };

            A.CallTo(() => sprintRepository.UpdateItem(A<Core.Entities.Sprint>._))
                .Returns(entity);
            
            //Act
            var result = await sprintService.UpdateAsync(model);

            //Assert
            AssertSprintModelProperties(expectedModel, result);
            
            A.CallTo(() => sprintRepository.UpdateItem(A<Core.Entities.Sprint>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldRemoveSprintSoftAsync()
        {
            //Arrange
            var sprintRepository = A.Fake<ISprintRepository>();

            var sprintService = new SprintService(sprintRepository);

            var sprint = new Sprint
            {
                SprintId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec"),
            };
            
            A.CallTo(() => sprintRepository.DeleteSoft(A<Guid>._))
                .DoesNothing();
            
            //Act
            await sprintService.SoftRemoveAsync(sprint);

            //Assert
            A.CallTo(() => sprintRepository.DeleteSoft(A<Guid>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldRemoveSprintAsync()
        {
            //Arrange
            var sprintRepository = A.Fake<ISprintRepository>();

            var sprintService = new SprintService(sprintRepository);
            
            var sprintId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");

            A.CallTo(() => sprintRepository.Remove(A<Expression<Func<Core.Entities.Sprint, bool>>>._))
                .DoesNothing();
            
            //Act
            await sprintService.RemoveAsync(sprintId);

            //Assert
            A.CallTo(() => sprintRepository.Remove(A<Expression<Func<Core.Entities.Sprint, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }
        
        
        private static void AssertSprintModelProperties(Sprint expectedModel, Sprint result)
        {
            Assert.Equal(expectedModel.SprintId, result.SprintId);
            Assert.Equal(expectedModel.EpicId, result.EpicId);
            Assert.Equal(expectedModel.SprintName, result.SprintName);
            Assert.Equal(expectedModel.StartDate, result.StartDate);
            Assert.Equal(expectedModel.EndDate, result.EndDate);
            Assert.Equal(expectedModel.CreationDate.Date, result.CreationDate.Date);
        }
    }
}