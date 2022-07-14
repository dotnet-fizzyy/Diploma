using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using FakeItEasy;
using WebAPI.ApplicationLogic.Services;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using Xunit;

using EpicEntity = WebAPI.Core.Entities.Epic;
using EpicModel = WebAPI.Models.Models.Models.Epic;
using FullEpicModel = WebAPI.Models.Models.Result.FullEpic;
using SprintEntity = WebAPI.Core.Entities.Sprint;
using SprintModel = WebAPI.Models.Models.Models.Sprint;

namespace WebAPI.UnitTests.Services
{
    public class EpicServiceTests
    {
        [Fact]
        public async Task ShouldGetEntityByIdAsync()
        {
            //Arrange
            var epicRepository = A.Fake<IEpicRepository>();

            var epicService = new EpicService(epicRepository);

            var epicId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var projectId = new Guid("5593238f-87e6-4444-1111-ab79b8804444");
            const string epicName = "EpicName";
            const string epicDescription = "EpicDescription";
            var startDate = DateTime.UtcNow;
            var endDate = DateTime.UtcNow.AddDays(2);
            var creationDate = DateTime.UtcNow;

            var entity = new EpicEntity
            {
                Id = epicId,
                ProjectId = projectId,
                EpicName = epicName,
                EpicDescription = epicDescription,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate
            };
            
            var expectedModel = new EpicModel
            {
                EpicId = epicId,
                ProjectId = projectId,
                EpicName = epicName,
                EpicDescription = epicDescription,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate
            };

            A.CallTo(() => epicRepository.SearchForSingleItemAsync(A<Expression<Func<EpicEntity, bool>>>._))
                .Returns(entity);
            
            //Act
            var result = await epicService.GetEpicByIdAsync(epicId);

            //Assert
            AssertEpicModelProperties(expectedModel, result);

            A.CallTo(() => epicRepository.SearchForSingleItemAsync(A<Expression<Func<EpicEntity, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldThrowErrorForMissingEntityOnGetEntityByIdAsync()
        {
            //Arrange
            var epicRepository = A.Fake<IEpicRepository>();

            var epicService = new EpicService(epicRepository);

            var epicId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");

            A.CallTo(() => epicRepository.SearchForSingleItemAsync(A<Expression<Func<EpicEntity, bool>>>._))
                .Returns((EpicEntity)null);
            
            //Act && Assert
           await Assert.ThrowsAsync<UserFriendlyException>(() => epicService.GetEpicByIdAsync(epicId));

            A.CallTo(() => epicRepository.SearchForSingleItemAsync(A<Expression<Func<EpicEntity, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldGetFullEpicDescriptionAsync()
        {
            //Arrange
            var epicRepository = A.Fake<IEpicRepository>();

            var epicService = new EpicService(epicRepository);

            var epicId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var projectId = new Guid("5593238f-87e6-4444-1111-ab79b8804444");
            var sprintId = new Guid("1193238f-87e6-3333-1111-ab79b8807777");
            const string epicName = "EpicName";
            const string epicDescription = "EpicDescription";
            const string sprintName = "SprintName";
            var startDate = DateTime.UtcNow;
            var endDate = DateTime.UtcNow.AddDays(2);
            var creationDate = DateTime.UtcNow;

            var entity = new EpicEntity
            {
                Id = epicId,
                ProjectId = projectId,
                EpicName = epicName,
                EpicDescription = epicDescription,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate,
                Sprints = new List<SprintEntity>
                {
                    new SprintEntity
                    {
                        Id = sprintId,
                        SprintName = sprintName,
                        EpicId = epicId,
                    }
                }
            };
            
            var expectedModel = new FullEpicModel
            {
                EpicId = epicId,
                ProjectId = projectId,
                EpicName = epicName,
                EpicDescription = epicDescription,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate,
                Sprints = new List<SprintModel>
                {
                    new SprintModel
                    {
                        SprintId = sprintId,
                        SprintName = sprintName,
                        EpicId = epicId,   
                    }
                }
            };

            A.CallTo(() => epicRepository.SearchForSingleItemAsync(
                        A<Expression<Func<EpicEntity, bool>>>._, 
                        A<Expression<Func<EpicEntity, object>>>._))
              .Returns(entity);
            
            //Act
            var result = await epicService.GetFullEpicDescriptionAsync(epicId);

            //Assert
            AssertEpicModelProperties(expectedModel, result);
            Assert.Equal(expectedModel.Sprints[0].SprintId, result.Sprints[0].SprintId);
            Assert.Equal(expectedModel.Sprints[0].SprintName, result.Sprints[0].SprintName);
            Assert.Equal(expectedModel.Sprints[0].EpicId, result.Sprints[0].EpicId);

            A.CallTo(() => epicRepository.SearchForSingleItemAsync(
                    A<Expression<Func<EpicEntity, bool>>>._, 
                    A<Expression<Func<EpicEntity, object>>>._))
             .MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task ShouldThrowErrorForMissingEntityOnGetFullEpicDescriptionAsync()
        {
            //Arrange
            var epicRepository = A.Fake<IEpicRepository>();

            var epicService = new EpicService(epicRepository);

            var epicId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");

            A.CallTo(() => epicRepository.SearchForSingleItemAsync(
                    A<Expression<Func<EpicEntity, bool>>>._, 
                    A<Expression<Func<EpicEntity, object>>>._))
             .Returns((EpicEntity)null);
            
            //Act && Assert
            await Assert.ThrowsAsync<UserFriendlyException>(() => epicService.GetFullEpicDescriptionAsync(epicId));

            A.CallTo(() => epicRepository.SearchForSingleItemAsync(
                    A<Expression<Func<EpicEntity, bool>>>._, 
                    A<Expression<Func<EpicEntity, object>>>._))
             .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldCreateEpicAsync()
        {
            //Arrange
            var epicRepository = A.Fake<IEpicRepository>();

            var epicService = new EpicService(epicRepository);

            var epicId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var projectId = new Guid("5593238f-87e6-4444-1111-ab79b8804444");
            const string epicName = "EpicName";
            const string epicDescription = "EpicDescription";
            var startDate = DateTime.UtcNow;
            var endDate = DateTime.UtcNow.AddDays(2);
            var creationDate = DateTime.UtcNow;

            var model = new EpicModel
            {
                ProjectId = projectId,
                EpicName = epicName,
                EpicDescription = epicDescription,
                StartDate = startDate,
                EndDate = endDate,
            };
            
            var entity = new EpicEntity
            {
                Id = epicId,
                ProjectId = projectId,
                EpicName = epicName,
                EpicDescription = epicDescription,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate,
            };

            var expectedModel = new EpicModel
            {
                EpicId = epicId,
                ProjectId = projectId,
                EpicName = epicName,
                EpicDescription = epicDescription,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate,
            };

            A.CallTo(() => epicRepository.CreateAsync(A<EpicEntity>._))
                .Returns(entity);
            
            //Act
            var result = await epicService.CreateEpicAsync(model);

            //Assert
            AssertEpicModelProperties(expectedModel, result);

            A.CallTo(() => epicRepository.CreateAsync(A<EpicEntity>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldUpdateAsync()
        {
            //Arrange
            var epicRepository = A.Fake<IEpicRepository>();

            var epicService = new EpicService(epicRepository);

            var epicId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var projectId = new Guid("5593238f-87e6-4444-1111-ab79b8804444");
            const string epicName = "EpicName";
            const string epicDescription = "EpicDescription";
            var startDate = DateTime.UtcNow;
            var endDate = DateTime.UtcNow.AddDays(2);
            var creationDate = DateTime.UtcNow;

            var model = new EpicModel
            {
                EpicId = epicId,
                ProjectId = projectId,
                EpicName = epicName,
                EpicDescription = epicDescription,
                StartDate = startDate,
                EndDate = endDate,
            };
            
            var entity = new EpicEntity
            {
                Id = epicId,
                ProjectId = projectId,
                EpicName = epicName,
                EpicDescription = epicDescription,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate,
            };

            var expectedModel = new EpicModel
            {
                EpicId = epicId,
                ProjectId = projectId,
                EpicName = epicName,
                EpicDescription = epicDescription,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate
            };

            A.CallTo(() => epicRepository.UpdateItemAsync(A<EpicEntity>._))
                .Returns(entity);
            
            //Act
            var result = await epicService.UpdateEpicAsync(model);

            //Assert
            AssertEpicModelProperties(expectedModel, result);

            A.CallTo(() => epicRepository.UpdateItemAsync(A<EpicEntity>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldRemoveEpicSoftAsync()
        {
            //Arrange
            var epicRepository = A.Fake<IEpicRepository>();

            var epicService = new EpicService(epicRepository);

            var epic = new EpicModel
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

            var epicService = new EpicService(epicRepository);

            var epicId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            
            A.CallTo(() => epicRepository.DeleteAsync(A<Expression<Func<EpicEntity, bool>>>._))
                .DoesNothing();
            
            //Act
            await epicService.RemoveEpicAsync(epicId);

            //Assert
            A.CallTo(() => epicRepository.DeleteAsync(A<Expression<Func<EpicEntity, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }
        
        
        private static void AssertEpicModelProperties(EpicModel expectedModel, EpicModel result)
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