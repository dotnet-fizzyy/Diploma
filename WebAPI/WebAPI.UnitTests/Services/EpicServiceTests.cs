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
using WebAPI.Presentation.Mappers;
using Xunit;

namespace WebAPI.UnitTests.Services
{
    public class EpicServiceTests
    {
        [Fact]
        public async Task ShouldGetEntityByIdAsync()
        {
            //Arrange
            var epicRepository = A.Fake<IEpicRepository>();
            var epicMapper = new EpicMapper(new SprintMapper(new StoryMapper(new StoryHistoryMapper())));

            var epicService = new EpicService(epicRepository, epicMapper);

            var epicId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var projectId = new Guid("5593238f-87e6-4444-1111-ab79b8804444");
            const string epicName = "EpicName";
            const string epicDescription = "EpicDescription";
            var startDate = DateTime.UtcNow;
            var endDate = DateTime.UtcNow.AddDays(2);
            var creationDate = DateTime.UtcNow;

            var entity = new Core.Entities.Epic
            {
                Id = epicId,
                ProjectId = projectId,
                EpicName = epicName,
                EpicDescription = epicDescription,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate
            };
            
            var expectedModel = new Epic
            {
                EpicId = epicId,
                ProjectId = projectId,
                EpicName = epicName,
                EpicDescription = epicDescription,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate
            };

            A.CallTo(() => epicRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Epic, bool>>>._))
                .Returns(entity);
            
            //Act
            var result = await epicService.GetEpicByIdAsync(epicId);

            //Assert
            AssertEpicModelProperties(expectedModel, result);

            A.CallTo(() => epicRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Epic, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldThrowErrorForMissingEntityOnGetEntityByIdAsync()
        {
            //Arrange
            var epicRepository = A.Fake<IEpicRepository>();
            var epicMapper = new EpicMapper(new SprintMapper(new StoryMapper(new StoryHistoryMapper())));

            var epicService = new EpicService(epicRepository, epicMapper);

            var epicId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");

            A.CallTo(() => epicRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Epic, bool>>>._))
                .Returns((Core.Entities.Epic)null);
            
            //Act && Assert
           await Assert.ThrowsAsync<UserFriendlyException>(() => epicService.GetEpicByIdAsync(epicId));

            A.CallTo(() => epicRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Epic, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldGetFullEpicDescriptionAsync()
        {
            //Arrange
            var epicRepository = A.Fake<IEpicRepository>();
            var epicMapper = new EpicMapper(new SprintMapper(new StoryMapper(new StoryHistoryMapper())));

            var epicService = new EpicService(epicRepository, epicMapper);

            var epicId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var projectId = new Guid("5593238f-87e6-4444-1111-ab79b8804444");
            var sprintId = new Guid("1193238f-87e6-3333-1111-ab79b8807777");
            const string epicName = "EpicName";
            const string epicDescription = "EpicDescription";
            const string sprintName = "SprintName";
            var startDate = DateTime.UtcNow;
            var endDate = DateTime.UtcNow.AddDays(2);
            var creationDate = DateTime.UtcNow;

            var entity = new Core.Entities.Epic
            {
                Id = epicId,
                ProjectId = projectId,
                EpicName = epicName,
                EpicDescription = epicDescription,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate,
                Sprints = new List<Core.Entities.Sprint>
                {
                    new Core.Entities.Sprint
                    {
                        Id = sprintId,
                        SprintName = sprintName,
                        EpicId = epicId,
                    }
                }
            };
            
            var expectedModel = new FullEpic
            {
                EpicId = epicId,
                ProjectId = projectId,
                EpicName = epicName,
                EpicDescription = epicDescription,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate,
                Sprints = new List<Sprint>
                {
                    new Sprint
                    {
                        SprintId = sprintId,
                        SprintName = sprintName,
                        EpicId = epicId,   
                    }
                }
            };

            A.CallTo(() => epicRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Epic, bool>>>._, A<Expression<Func<Core.Entities.Epic,object>>>._))
                .Returns(entity);
            
            //Act
            var result = await epicService.GetFullEpicDescriptionAsync(epicId);

            //Assert
            AssertEpicModelProperties(expectedModel, result);
            Assert.Equal(expectedModel.Sprints[0].SprintId, result.Sprints[0].SprintId);
            Assert.Equal(expectedModel.Sprints[0].SprintName, result.Sprints[0].SprintName);
            Assert.Equal(expectedModel.Sprints[0].EpicId, result.Sprints[0].EpicId);

            A.CallTo(() => epicRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Epic, bool>>>._, A<Expression<Func<Core.Entities.Epic,object>>>._))
                .MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task ShouldThrowErrorForMissingEntityOnGetFullEpicDescriptionAsync()
        {
            //Arrange
            var epicRepository = A.Fake<IEpicRepository>();
            var epicMapper = new EpicMapper(new SprintMapper(new StoryMapper(new StoryHistoryMapper())));

            var epicService = new EpicService(epicRepository, epicMapper);

            var epicId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");

            A.CallTo(() => epicRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Epic, bool>>>._, A<Expression<Func<Core.Entities.Epic,object>>>._))
                .Returns((Core.Entities.Epic)null);
            
            //Act && Assert
            await Assert.ThrowsAsync<UserFriendlyException>(() => epicService.GetFullEpicDescriptionAsync(epicId));

            A.CallTo(() => epicRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Epic, bool>>>._, A< Expression<Func<Core.Entities.Epic,object>>>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldCreateEpicAsync()
        {
            //Arrange
            var epicRepository = A.Fake<IEpicRepository>();
            var epicMapper = new EpicMapper(new SprintMapper(new StoryMapper(new StoryHistoryMapper())));

            var epicService = new EpicService(epicRepository, epicMapper);

            var epicId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var projectId = new Guid("5593238f-87e6-4444-1111-ab79b8804444");
            const string epicName = "EpicName";
            const string epicDescription = "EpicDescription";
            var startDate = DateTime.UtcNow;
            var endDate = DateTime.UtcNow.AddDays(2);
            var creationDate = DateTime.UtcNow;

            var model = new Epic
            {
                ProjectId = projectId,
                EpicName = epicName,
                EpicDescription = epicDescription,
                StartDate = startDate,
                EndDate = endDate,
            };
            
            var entity = new Core.Entities.Epic
            {
                Id = epicId,
                ProjectId = projectId,
                EpicName = epicName,
                EpicDescription = epicDescription,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate,
            };

            var expectedModel = new Epic
            {
                EpicId = epicId,
                ProjectId = projectId,
                EpicName = epicName,
                EpicDescription = epicDescription,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate,
            };

            A.CallTo(() => epicRepository.CreateAsync(A<Core.Entities.Epic>._))
                .Returns(entity);
            
            //Act
            var result = await epicService.CreateEpicAsync(model);

            //Assert
            AssertEpicModelProperties(expectedModel, result);

            A.CallTo(() => epicRepository.CreateAsync(A<Core.Entities.Epic>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldUpdateAsync()
        {
            //Arrange
            var epicRepository = A.Fake<IEpicRepository>();
            var epicMapper = new EpicMapper(new SprintMapper(new StoryMapper(new StoryHistoryMapper())));

            var epicService = new EpicService(epicRepository, epicMapper);

            var epicId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var projectId = new Guid("5593238f-87e6-4444-1111-ab79b8804444");
            const string epicName = "EpicName";
            const string epicDescription = "EpicDescription";
            var startDate = DateTime.UtcNow;
            var endDate = DateTime.UtcNow.AddDays(2);
            var creationDate = DateTime.UtcNow;

            var model = new Epic
            {
                EpicId = epicId,
                ProjectId = projectId,
                EpicName = epicName,
                EpicDescription = epicDescription,
                StartDate = startDate,
                EndDate = endDate,
            };
            
            var entity = new Core.Entities.Epic
            {
                Id = epicId,
                ProjectId = projectId,
                EpicName = epicName,
                EpicDescription = epicDescription,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate,
            };

            var expectedModel = new Epic
            {
                EpicId = epicId,
                ProjectId = projectId,
                EpicName = epicName,
                EpicDescription = epicDescription,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate
            };

            A.CallTo(() => epicRepository.UpdateItemAsync(A<Core.Entities.Epic>._))
                .Returns(entity);
            
            //Act
            var result = await epicService.UpdateEpicAsync(model);

            //Assert
            AssertEpicModelProperties(expectedModel, result);

            A.CallTo(() => epicRepository.UpdateItemAsync(A<Core.Entities.Epic>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldRemoveEpicSoftAsync()
        {
            //Arrange
            var epicRepository = A.Fake<IEpicRepository>();
            var epicMapper = new EpicMapper(new SprintMapper(new StoryMapper(new StoryHistoryMapper())));

            var epicService = new EpicService(epicRepository, epicMapper);

            var epic = new Epic
            {
                EpicId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec"),
            };
            
            A.CallTo(() => epicRepository.DeleteSoftAsync(A<Guid>._))
                .DoesNothing();
            
            //Act
            await epicService.RemoveEpicSoftAsync(epic);

            //Assert
            A.CallTo(() => epicRepository.DeleteSoftAsync(A<Guid>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldRemoveEpicAsync()
        {
            //Arrange
            var epicRepository = A.Fake<IEpicRepository>();
            var epicMapper = new EpicMapper(new SprintMapper(new StoryMapper(new StoryHistoryMapper())));

            var epicService = new EpicService(epicRepository, epicMapper);

            var epicId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            
            A.CallTo(() => epicRepository.DeleteAsync(A<Expression<Func<Core.Entities.Epic, bool>>>._))
                .DoesNothing();
            
            //Act
            await epicService.RemoveEpicAsync(epicId);

            //Assert
            A.CallTo(() => epicRepository.DeleteAsync(A<Expression<Func<Core.Entities.Epic, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }
        
        
        private static void AssertEpicModelProperties(Epic expectedModel, Epic result)
        {
            Assert.Equal(expectedModel.EpicId, result.EpicId);
            Assert.Equal(expectedModel.EpicName, result.EpicName);
            Assert.Equal(expectedModel.EpicDescription, result.EpicDescription);
            Assert.Equal(expectedModel.StartDate, result.StartDate);
            Assert.Equal(expectedModel.EndDate, result.EndDate);
            Assert.Equal(expectedModel.ProjectId, result.ProjectId);
            Assert.Equal(expectedModel.CreationDate.Date, result.CreationDate.Date);
        }
    }
}