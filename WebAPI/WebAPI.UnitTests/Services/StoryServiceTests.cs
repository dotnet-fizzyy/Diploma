using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using FakeItEasy;
using WebAPI.ApplicationLogic.Services;
using WebAPI.Core.Constants;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;
using WebAPI.Presentation.Aggregators;
using WebAPI.Presentation.Mappers;
using Xunit;

namespace WebAPI.UnitTests.Services
{
    public class StoryServiceTests
    {
        [Fact]
        public async Task ShouldGetStoryByIdAsync()
        {
            //Arrange
            var storyRepository = A.Fake<IStoryRepository>();
            var sprintRepository = A.Fake<ISprintRepository>();        
            var storyHistoryRepository = A.Fake<IStoryHistoryRepository>();
            var userRepository = A.Fake<IUserRepository>();
            var storyMapper = new StoryMapper(new StoryHistoryMapper());
            var storyAggregator = new StoryAggregator();

            var storyService = new StoryService(storyRepository, sprintRepository, storyHistoryRepository, userRepository, storyMapper, storyAggregator);

            var storyId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var userId = new Guid("3333238f-87e6-4e86-93fc-ab79b8804444");
            var sprintId = new Guid("1111238f-0000-0000-7777-ab79b8805555");
            const int estimate = 3;
            const int recordVersion = 555;
            const string notes = "Notes";
            const string title = "Title";
            const string description = "Description";
            const bool isReady = false;
            const bool isDeleted = false;
            const bool isBlocked = true;
            const string blockReason = "Reason";
            var creationDate = DateTime.UtcNow;
            
            var entity = new Core.Entities.Story
            {
                Id = storyId,
                StoryPriority = Core.Enums.StoryPriority.Low,
                ColumnType = Core.Enums.ColumnType.InProgress,
                Estimate = estimate,
                Notes = notes,
                Title = title,
                RecordVersion = recordVersion,
                IsDeleted = isDeleted,
                IsReady = isReady,
                IsBlocked = isBlocked,
                BlockReason = blockReason,
                UserId = userId,
                SprintId = sprintId,
                Description = description,
                RequiredPosition = Core.Enums.UserPosition.Developer,
                CreationDate = creationDate
            };
            
            var expectedModel = new Story
            {
                StoryId = storyId,
                StoryPriority = Models.Enums.StoryPriority.Low,
                ColumnType = Models.Enums.ColumnType.InProgress,
                Estimate = estimate,
                Notes = notes,
                Title = title,
                RecordVersion = recordVersion,
                IsDeleted = isDeleted,
                IsReady = isReady,
                IsBlocked = isBlocked,
                BlockReason = blockReason,
                UserId = userId,
                SprintId = sprintId,
                Description = description,
                RequiredPosition = Models.Enums.UserPosition.Developer,
                CreationDate = creationDate
            };

            A.CallTo(() => storyRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Story, bool>>>._))
                .Returns(entity);
            
            //Act
            var result = await storyService.GetStoryByIdAsync(storyId);

            //Assert
            AssertStoryModelProperties(expectedModel, result);

            A.CallTo(() => storyRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Story, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task ShouldThrowErrorForMissingEntityOnGetStoryByIdAsync()
        {
            //Arrange
            var storyRepository = A.Fake<IStoryRepository>();
            var sprintRepository = A.Fake<ISprintRepository>();        
            var storyHistoryRepository = A.Fake<IStoryHistoryRepository>();
            var userRepository = A.Fake<IUserRepository>();
            var storyMapper = new StoryMapper(new StoryHistoryMapper());
            var storyAggregator = new StoryAggregator();

            var storyService = new StoryService(storyRepository, sprintRepository, storyHistoryRepository, userRepository, storyMapper, storyAggregator);

            var storyId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");

            A.CallTo(() => storyRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Story, bool>>>._))
                .Returns((Core.Entities.Story)null);
            
            //Act && Asser
            await Assert.ThrowsAsync<UserFriendlyException>(async () => await storyService.GetStoryByIdAsync(storyId));

            A.CallTo(() => storyRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Story, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task ShouldGetStoriesFromSprintAsync()
        {
            //Arrange
            var storyRepository = A.Fake<IStoryRepository>();
            var sprintRepository = A.Fake<ISprintRepository>();        
            var storyHistoryRepository = A.Fake<IStoryHistoryRepository>();
            var userRepository = A.Fake<IUserRepository>();
            var storyMapper = new StoryMapper(new StoryHistoryMapper());
            var storyAggregator = new StoryAggregator();

            var storyService = new StoryService(storyRepository, sprintRepository, storyHistoryRepository, userRepository, storyMapper, storyAggregator);

            var storyId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var userId = new Guid("3333238f-87e6-4e86-93fc-ab79b8804444");
            var sprintId = new Guid("1111238f-0000-0000-7777-ab79b8805555");
            const int estimate = 3;
            const int recordVersion = 555;
            const string notes = "Notes";
            const string title = "Title";
            const string description = "Description";
            const bool isReady = false;
            const bool isDeleted = false;
            const bool isBlocked = true;
            const string blockReason = "Reason";
            var creationDate = DateTime.UtcNow;
            
            var entities = new List<Core.Entities.Story>
            {
                new Core.Entities.Story
                {
                    Id = storyId,
                    StoryPriority = Core.Enums.StoryPriority.Low,
                    ColumnType = Core.Enums.ColumnType.InProgress,
                    Estimate = estimate,
                    Notes = notes,
                    Title = title,
                    RecordVersion = recordVersion,
                    IsDeleted = isDeleted,
                    IsReady = isReady,
                    IsBlocked = isBlocked,
                    BlockReason = blockReason,
                    UserId = userId,
                    SprintId = sprintId,
                    Description = description,
                    RequiredPosition = Core.Enums.UserPosition.Developer,
                    CreationDate = creationDate
                }
            };
            
            var expectedModels = new CollectionResponse<Story>
            {
                Items = new List<Story>
                {
                    new Story
                    {
                        StoryId = storyId,
                        StoryPriority = Models.Enums.StoryPriority.Low,
                        ColumnType = Models.Enums.ColumnType.InProgress,
                        Estimate = estimate,
                        Notes = notes,
                        Title = title,
                        RecordVersion = recordVersion,
                        IsDeleted = isDeleted,
                        IsReady = isReady,
                        IsBlocked = isBlocked,
                        BlockReason = blockReason,
                        UserId = userId,
                        SprintId = sprintId,
                        Description = description,
                        RequiredPosition = Models.Enums.UserPosition.Developer,
                        CreationDate = creationDate
                    }
                }
            };

            A.CallTo(() => storyRepository.SearchForMultipleItemsAsync(A<Expression<Func<Core.Entities.Story, bool>>>._))
                .Returns(entities);
            
            //Act
            var result = await storyService.GetStoriesFromSprintAsync(sprintId);

            //Assert
            Assert.Equal(expectedModels.Count, result.Count);
            AssertStoryModelProperties(expectedModels.Items[0], result.Items[0]);

            A.CallTo(() => storyRepository.SearchForMultipleItemsAsync(A<Expression<Func<Core.Entities.Story, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldReturnEmptyCollectionResponseOnGetStoriesFromSprintAsync()
        {
            //Arrange
            var storyRepository = A.Fake<IStoryRepository>();
            var sprintRepository = A.Fake<ISprintRepository>();        
            var storyHistoryRepository = A.Fake<IStoryHistoryRepository>();
            var userRepository = A.Fake<IUserRepository>();
            var storyMapper = new StoryMapper(new StoryHistoryMapper());
            var storyAggregator = new StoryAggregator();

            var storyService = new StoryService(storyRepository, sprintRepository, storyHistoryRepository, userRepository, storyMapper, storyAggregator);

            var sprintId = new Guid("1111238f-0000-0000-7777-ab79b8805555");
            
            A.CallTo(() => storyRepository.SearchForMultipleItemsAsync(A<Expression<Func<Core.Entities.Story, bool>>>._))
                .Returns(new List<Core.Entities.Story>());
            
            //Act
            var result = await storyService.GetStoriesFromSprintAsync(sprintId);

            //Assert
            Assert.NotNull(result.Items);
            Assert.Empty(result.Items);

            A.CallTo(() => storyRepository.SearchForMultipleItemsAsync(A<Expression<Func<Core.Entities.Story, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task ShouldSortStoriesFromEpicAsync()
        {
            //Arrange
            var storyRepository = A.Fake<IStoryRepository>();
            var sprintRepository = A.Fake<ISprintRepository>();        
            var storyHistoryRepository = A.Fake<IStoryHistoryRepository>();
            var userRepository = A.Fake<IUserRepository>();
            var storyMapper = new StoryMapper(new StoryHistoryMapper());
            var storyAggregator = new StoryAggregator();

            var storyService = new StoryService(storyRepository, sprintRepository, storyHistoryRepository, userRepository, storyMapper, storyAggregator);

            var epicId = new Guid("5593238f-87e6-4e86-93fc-ab79b8804444");
            
            var storyId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var userId = new Guid("3333238f-87e6-4e86-93fc-ab79b8804444");
            var sprintId = new Guid("1111238f-0000-0000-7777-ab79b8805555");
            var teamId = new Guid("2222238f-0000-0000-7777-ab79b8805555");
            const int estimate = 3;
            const int recordVersion = 555;
            const string notes = "Notes";
            const string title = "Title";
            const string description = "Description";
            const bool isReady = false;
            const bool isDeleted = false;
            const bool isBlocked = true;
            const string blockReason = "Reason";
            var creationDate = DateTime.UtcNow;
            
            var entities = new List<Core.Entities.Story>
            {
                new Core.Entities.Story
                {
                    Id = storyId,
                    StoryPriority = Core.Enums.StoryPriority.Low,
                    ColumnType = Core.Enums.ColumnType.InProgress,
                    Estimate = estimate,
                    Notes = notes,
                    Title = title,
                    RecordVersion = recordVersion,
                    IsDeleted = isDeleted,
                    IsReady = isReady,
                    IsBlocked = isBlocked,
                    BlockReason = blockReason,
                    UserId = userId,
                    SprintId = sprintId,
                    Description = description,
                    RequiredPosition = Core.Enums.UserPosition.Developer,
                    CreationDate = creationDate
                }
            };
            
            var expectedModels = new CollectionResponse<Story>
            {
                Items = new List<Story>
                {
                    new Story
                    {
                        StoryId = storyId,
                        StoryPriority = Models.Enums.StoryPriority.Low,
                        ColumnType = Models.Enums.ColumnType.InProgress,
                        Estimate = estimate,
                        Notes = notes,
                        Title = title,
                        RecordVersion = recordVersion,
                        IsDeleted = isDeleted,
                        IsReady = isReady,
                        IsBlocked = isBlocked,
                        BlockReason = blockReason,
                        UserId = userId,
                        SprintId = sprintId,
                        Description = description,
                        RequiredPosition = Models.Enums.UserPosition.Developer,
                        CreationDate = creationDate
                    }
                }
            };

            A.CallTo(() => storyRepository.GetStoriesByEpicId(A<Guid>._, A<Guid>._))
                .Returns(entities);

            //Act
            var result = await storyService.SortStories(epicId, teamId,null, SortTypes.Title, Core.Enums.OrderType.Asc);

            //Assert
            Assert.Equal(expectedModels.Count, result.Count);
            AssertStoryModelProperties(expectedModels.Items[0], result.Items[0]);

            A.CallTo(() => storyRepository.GetStoriesByEpicId(A<Guid>._, A<Guid>._))
                .MustHaveHappened();
            A.CallTo(() => storyRepository.SearchForMultipleItemsAsync(A<Expression<Func<Core.Entities.Story, bool>>>._))
                .MustNotHaveHappened();
        }
        
        [Fact]
        public async Task ShouldSortStoriesFromSprintAsync()
        {
            //Arrange
            var storyRepository = A.Fake<IStoryRepository>();
            var sprintRepository = A.Fake<ISprintRepository>();        
            var storyHistoryRepository = A.Fake<IStoryHistoryRepository>();
            var userRepository = A.Fake<IUserRepository>();
            var storyMapper = new StoryMapper(new StoryHistoryMapper());
            var storyAggregator = new StoryAggregator();

            var storyService = new StoryService(storyRepository, sprintRepository, storyHistoryRepository, userRepository, storyMapper, storyAggregator);

            var epicId = new Guid("5593238f-87e6-4e86-93fc-ab79b8804444");
            
            var storyId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var userId = new Guid("3333238f-87e6-4e86-93fc-ab79b8804444");
            var sprintId = new Guid("1111238f-0000-0000-7777-ab79b8805555");
            var teamId = new Guid("2222238f-0000-0000-7777-ab79b8805555");
            const int estimate = 3;
            const int recordVersion = 555;
            const string notes = "Notes";
            const string title = "Title";
            const string description = "Description";
            const bool isReady = false;
            const bool isDeleted = false;
            const bool isBlocked = true;
            const string blockReason = "Reason";
            var creationDate = DateTime.UtcNow;
            
            var entities = new List<Core.Entities.Story>
            {
                new Core.Entities.Story
                {
                    Id = storyId,
                    StoryPriority = Core.Enums.StoryPriority.Low,
                    ColumnType = Core.Enums.ColumnType.InProgress,
                    Estimate = estimate,
                    Notes = notes,
                    Title = title,
                    RecordVersion = recordVersion,
                    IsDeleted = isDeleted,
                    IsReady = isReady,
                    IsBlocked = isBlocked,
                    BlockReason = blockReason,
                    UserId = userId,
                    SprintId = sprintId,
                    Description = description,
                    RequiredPosition = Core.Enums.UserPosition.Developer,
                    CreationDate = creationDate
                }
            };
            
            var expectedModels = new CollectionResponse<Story>
            {
                Items = new List<Story>
                {
                    new Story
                    {
                        StoryId = storyId,
                        StoryPriority = Models.Enums.StoryPriority.Low,
                        ColumnType = Models.Enums.ColumnType.InProgress,
                        Estimate = estimate,
                        Notes = notes,
                        Title = title,
                        RecordVersion = recordVersion,
                        IsDeleted = isDeleted,
                        IsReady = isReady,
                        IsBlocked = isBlocked,
                        BlockReason = blockReason,
                        UserId = userId,
                        SprintId = sprintId,
                        Description = description,
                        RequiredPosition = Models.Enums.UserPosition.Developer,
                        CreationDate = creationDate
                    }
                }
            };

            A.CallTo(() => storyRepository.SearchForMultipleItemsAsync(A<Expression<Func<Core.Entities.Story, bool>>>._))
                .Returns(entities);

            //Act
            var result = await storyService.SortStories(epicId,  teamId, sprintId, SortTypes.Title, Core.Enums.OrderType.Asc);

            //Assert
            Assert.Equal(expectedModels.Count, result.Count);
            AssertStoryModelProperties(expectedModels.Items[0], result.Items[0]);

            A.CallTo(() => storyRepository.SearchForMultipleItemsAsync(A<Expression<Func<Core.Entities.Story, bool>>>._))
                .MustHaveHappenedOnceExactly();
            A.CallTo(() => storyRepository.GetStoriesByEpicId(A<Guid>._, A<Guid>._))
                .MustNotHaveHappened();
        }
        
        [Fact]
        public async Task ShouldThrowErrorForMissingStoryEntitiesOnSortStoriesFromEpicAsync()
        {
            //Arrange
            var storyRepository = A.Fake<IStoryRepository>();
            var sprintRepository = A.Fake<ISprintRepository>();        
            var storyHistoryRepository = A.Fake<IStoryHistoryRepository>();
            var userRepository = A.Fake<IUserRepository>();
            var storyMapper = new StoryMapper(new StoryHistoryMapper());
            var storyAggregator = new StoryAggregator();

            var storyService = new StoryService(storyRepository, sprintRepository, storyHistoryRepository, userRepository, storyMapper, storyAggregator);

            var epicId = new Guid("5593238f-87e6-4e86-93fc-ab79b8804444");
            var teamId = new Guid("2222238f-0000-0000-7777-ab79b8805555");

            A.CallTo(() => storyRepository.GetStoriesByEpicId(A<Guid>._, A<Guid>._))
                .Returns(new List<Core.Entities.Story>());

            //Act
            //Act && Assert
            await Assert.ThrowsAsync<UserFriendlyException>(async () => await storyService.SortStories(epicId, teamId, null, SortTypes.Title, Core.Enums.OrderType.Asc));

            A.CallTo(() => storyRepository.GetStoriesByEpicId(A<Guid>._, A<Guid>._))
                .MustHaveHappened();
            A.CallTo(() => storyRepository.SearchForMultipleItemsAsync(A<Expression<Func<Core.Entities.Story, bool>>>._))
                .MustNotHaveHappened();
        }
        
        [Fact]
        public async Task ShouldGetStoriesFromEpicAsync()
        {
            //Arrange
            var storyRepository = A.Fake<IStoryRepository>();
            var sprintRepository = A.Fake<ISprintRepository>();        
            var storyHistoryRepository = A.Fake<IStoryHistoryRepository>();
            var userRepository = A.Fake<IUserRepository>();
            var storyMapper = new StoryMapper(new StoryHistoryMapper());
            var storyAggregator = new StoryAggregator();

            var storyService = new StoryService(storyRepository, sprintRepository, storyHistoryRepository, userRepository, storyMapper, storyAggregator);
            
            var epicId = new Guid("5593238f-87e6-4e86-93fc-ab79b8804444");
            
            var storyId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var userId = new Guid("3333238f-87e6-4e86-93fc-ab79b8804444");
            var sprintId = new Guid("1111238f-0000-0000-7777-ab79b8805555");
            var teamId = new Guid("2222238f-0000-0000-7777-ab79b8805555");
            const int estimate = 3;
            const int recordVersion = 555;
            const string notes = "Notes";
            const string title = "Title";
            const string description = "Description";
            const bool isReady = false;
            const bool isDeleted = false;
            const bool isBlocked = true;
            const string blockReason = "Reason";
            var creationDate = DateTime.UtcNow;

            var entities = new List<Core.Entities.Story>
            {
                new Core.Entities.Story
                {
                    Id = storyId,
                    StoryPriority = Core.Enums.StoryPriority.Low,
                    ColumnType = Core.Enums.ColumnType.InProgress,
                    Estimate = estimate,
                    Notes = notes,
                    Title = title,
                    RecordVersion = recordVersion,
                    IsDeleted = isDeleted,
                    IsReady = isReady,
                    IsBlocked = isBlocked,
                    BlockReason = blockReason,
                    UserId = userId,
                    SprintId = sprintId,
                    Description = description,
                    RequiredPosition = Core.Enums.UserPosition.Developer,
                    CreationDate = creationDate
                }
            };
            
            var expectedModels = new CollectionResponse<Story>
            {
                Items = new List<Story>
                {
                    new Story
                    {
                        StoryId = storyId,
                        StoryPriority = Models.Enums.StoryPriority.Low,
                        ColumnType = Models.Enums.ColumnType.InProgress,
                        Estimate = estimate,
                        Notes = notes,
                        Title = title,
                        RecordVersion = recordVersion,
                        IsDeleted = isDeleted,
                        IsReady = isReady,
                        IsBlocked = isBlocked,
                        BlockReason = blockReason,
                        UserId = userId,
                        SprintId = sprintId,
                        Description = description,
                        RequiredPosition = Models.Enums.UserPosition.Developer,
                        CreationDate = creationDate
                    }
                }
            };

            A.CallTo(() => storyRepository.GetStoriesByEpicId(A<Guid>._, A<Guid>._))
                .Returns(entities);
            
            //Act
            var result = await storyService.GetStoriesFromEpicAsync(epicId, teamId);

            //Assert
            Assert.Equal(expectedModels.Count, result.Count);
            AssertStoryModelProperties(expectedModels.Items[0], result.Items[0]);
        }
        
        [Fact]
        public async Task ShouldReturnEmptyCollectionResponseForMissingEntityOnGetStoriesFromEpicAsync()
        {
            //Arrange
            var storyRepository = A.Fake<IStoryRepository>();
            var sprintRepository = A.Fake<ISprintRepository>();        
            var storyHistoryRepository = A.Fake<IStoryHistoryRepository>();
            var userRepository = A.Fake<IUserRepository>();
            var storyMapper = new StoryMapper(new StoryHistoryMapper());
            var storyAggregator = new StoryAggregator();

            var storyService = new StoryService(storyRepository, sprintRepository, storyHistoryRepository, userRepository, storyMapper, storyAggregator);
            
            var epicId = new Guid("5593238f-87e6-4e86-93fc-ab79b8804444");
            var teamId = new Guid("2222238f-0000-0000-7777-ab79b8805555");

            A.CallTo(() => storyRepository.GetStoriesByEpicId(A<Guid>._, A<Guid>._))
                .Returns(new List<Core.Entities.Story>());
            
            //Act
            var result = await storyService.GetStoriesFromEpicAsync(epicId, teamId);

            //Assert
            Assert.NotNull(result.Items);
            Assert.Empty(result.Items);
        }

        [Fact]
        public async Task ShouldGetFullStoryDescriptionAsync()
        {
            //Arrange
            var storyRepository = A.Fake<IStoryRepository>();
            var sprintRepository = A.Fake<ISprintRepository>();        
            var storyHistoryRepository = A.Fake<IStoryHistoryRepository>();
            var userRepository = A.Fake<IUserRepository>();
            var storyMapper = new StoryMapper(new StoryHistoryMapper());
            var storyAggregator = new StoryAggregator();

            var storyService = new StoryService(storyRepository, sprintRepository, storyHistoryRepository, userRepository, storyMapper, storyAggregator);

            var storyId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var userId = new Guid("3333238f-87e6-4e86-93fc-ab79b8804444");
            var sprintId = new Guid("1111238f-0000-0000-7777-ab79b8805555");
            var storyHistoryId = new Guid("9999238f-0000-0000-7777-ab79b8805555");
            const int estimate = 3;
            const int recordVersion = 555;
            const string notes = "Notes";
            const string title = "Title";
            const string description = "Description";
            const bool isReady = false;
            const bool isDeleted = false;
            const bool isBlocked = true;
            const string blockReason = "Reason";
            var creationDate = DateTime.UtcNow;
            
            var entity = new Core.Entities.Story
            {
                Id = storyId,
                StoryPriority = Core.Enums.StoryPriority.Low,
                ColumnType = Core.Enums.ColumnType.InProgress,
                Estimate = estimate,
                Notes = notes,
                Title = title,
                RecordVersion = recordVersion,
                IsDeleted = isDeleted,
                IsReady = isReady,
                IsBlocked = isBlocked,
                BlockReason = blockReason,
                UserId = userId,
                SprintId = sprintId,
                Description = description,
                RequiredPosition = Core.Enums.UserPosition.Developer,
                CreationDate = creationDate,
                StoryHistories = new List<Core.Entities.StoryHistory>
                {
                    new Core.Entities.StoryHistory
                    {
                        Id = storyHistoryId,
                        StoryId = storyId
                    }
                }
            };
            
            var expectedModel = new FullStory
            {
                StoryId = storyId,
                StoryPriority = Models.Enums.StoryPriority.Low,
                ColumnType = Models.Enums.ColumnType.InProgress,
                Estimate = estimate,
                Notes = notes,
                Title = title,
                RecordVersion = recordVersion,
                IsDeleted = isDeleted,
                IsReady = isReady,
                IsBlocked = isBlocked,
                BlockReason = blockReason,
                UserId = userId,
                SprintId = sprintId,
                Description = description,
                RequiredPosition = Models.Enums.UserPosition.Developer,
                CreationDate = creationDate,
                StoryHistories = new List<StoryHistory>
                {
                    new StoryHistory
                    {
                        StoryHistoryId = storyHistoryId,
                        StoryId = storyId
                    }
                }
            };

            A.CallTo(() => storyRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Story, bool>>>._, A<Expression<Func<Core.Entities.Story, object>>>._))
                .Returns(entity);
            
            //Act
            var result = await storyService.GetFullStoryDescriptionAsync(storyId);

            //Assert
            AssertStoryModelProperties(expectedModel, result);
            
            Assert.Equal(expectedModel.StoryHistories.Count, result.StoryHistories.Count);
            Assert.Equal(expectedModel.StoryHistories[0].StoryHistoryId, result.StoryHistories[0].StoryHistoryId);
            Assert.Equal(expectedModel.StoryHistories[0].StoryId, result.StoryHistories[0].StoryId);

            A.CallTo(() => storyRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Story, bool>>>._, A<Expression<Func<Core.Entities.Story, object>>>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldThrowErrorForMissingEntityOnGetFullStoryDescriptionAsync()
        {
            //Arrange
            var storyRepository = A.Fake<IStoryRepository>();
            var sprintRepository = A.Fake<ISprintRepository>();        
            var storyHistoryRepository = A.Fake<IStoryHistoryRepository>();
            var userRepository = A.Fake<IUserRepository>();
            var storyMapper = new StoryMapper(new StoryHistoryMapper());
            var storyAggregator = new StoryAggregator();

            var storyService = new StoryService(storyRepository, sprintRepository, storyHistoryRepository, userRepository, storyMapper, storyAggregator);

            var storyId = new Guid("5593238f-87e6-4e86-93fc-ab79b8804444");

            A.CallTo(() => storyRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Story, bool>>>._, A<Expression<Func<Core.Entities.Story, object>>>._))
                .Returns((Core.Entities.Story)null);

            //Act
            //Act && Assert
            await Assert.ThrowsAsync<UserFriendlyException>(async () => await storyService.GetFullStoryDescriptionAsync(storyId));

            A.CallTo(() => storyRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Story, bool>>>._, A<Expression<Func<Core.Entities.Story, object>>>._))
                .MustHaveHappened();
        }
        
        [Fact]
        public async Task ShouldCreateStoryAsync()
        {
            //Arrange
            var storyRepository = A.Fake<IStoryRepository>();
            var sprintRepository = A.Fake<ISprintRepository>();        
            var storyHistoryRepository = A.Fake<IStoryHistoryRepository>();
            var userRepository = A.Fake<IUserRepository>();
            var storyMapper = new StoryMapper(new StoryHistoryMapper());
            var storyAggregator = new StoryAggregator();
            
            var storyService = new StoryService(storyRepository, sprintRepository, storyHistoryRepository, userRepository, storyMapper, storyAggregator);

            const string userName = "UserName";
            var storyId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var userId = new Guid("3333238f-87e6-4e86-93fc-ab79b8804444");
            var sprintId = new Guid("1111238f-0000-0000-7777-ab79b8805555");
            const int estimate = 3;
            const int recordVersion = 555;
            const string notes = "Notes";
            const string title = "Title";
            const string description = "Description";
            const bool isReady = false;
            const bool isDeleted = false;
            const bool isBlocked = true;
            const string blockReason = "Reason";
            var creationDate = DateTime.UtcNow;
            
            var model = new Story
            {
                StoryPriority = Models.Enums.StoryPriority.Low,
                ColumnType = Models.Enums.ColumnType.InProgress,
                Estimate = estimate,
                Notes = notes,
                Title = title,
                RecordVersion = recordVersion,
                IsDeleted = isDeleted,
                IsReady = isReady,
                IsBlocked = isBlocked,
                BlockReason = blockReason,
                UserId = userId,
                SprintId = sprintId,
                Description = description,
                RequiredPosition = Models.Enums.UserPosition.Developer,
            };
            
            var entity = new Core.Entities.Story
            {
                Id = storyId,
                StoryPriority = Core.Enums.StoryPriority.Low,
                ColumnType = Core.Enums.ColumnType.InProgress,
                Estimate = estimate,
                Notes = notes,
                Title = title,
                RecordVersion = recordVersion,
                IsDeleted = isDeleted,
                IsReady = isReady,
                IsBlocked = isBlocked,
                BlockReason = blockReason,
                UserId = userId,
                SprintId = sprintId,
                Description = description,
                RequiredPosition = Core.Enums.UserPosition.Developer,
                CreationDate = creationDate
            };
            
            var expectedModel = new Story
            {
                StoryId = storyId,
                StoryPriority = Models.Enums.StoryPriority.Low,
                ColumnType = Models.Enums.ColumnType.InProgress,
                Estimate = estimate,
                Notes = notes,
                Title = title,
                RecordVersion = recordVersion,
                IsDeleted = isDeleted,
                IsReady = isReady,
                IsBlocked = isBlocked,
                BlockReason = blockReason,
                UserId = userId,
                SprintId = sprintId,
                Description = description,
                RequiredPosition = Models.Enums.UserPosition.Developer,
                CreationDate = creationDate
            };

            A.CallTo(() => storyRepository.CreateAsync(A<Core.Entities.Story>._))
                .Returns(entity);
            A.CallTo(() => storyHistoryRepository.CreateAsync(A<Core.Entities.StoryHistory>._))
                .Returns((Core.Entities.StoryHistory)null);
                
            //Act
            var result = await storyService.CreateStoryAsync(model, userName);

            //Assert
            AssertStoryModelProperties(expectedModel, result);
            
            A.CallTo(() => storyRepository.CreateAsync(A<Core.Entities.Story>._))
                .MustHaveHappenedOnceExactly();
            A.CallTo(() => storyHistoryRepository.CreateAsync(A<Core.Entities.StoryHistory>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldRemoveStorySoftAsync()
        {
            //Arrange
            var storyRepository = A.Fake<IStoryRepository>();
            var sprintRepository = A.Fake<ISprintRepository>();        
            var storyHistoryRepository = A.Fake<IStoryHistoryRepository>();
            var userRepository = A.Fake<IUserRepository>();
            var storyMapper = new StoryMapper(new StoryHistoryMapper());
            var storyAggregator = new StoryAggregator();

            var storyService = new StoryService(storyRepository, sprintRepository, storyHistoryRepository, userRepository, storyMapper, storyAggregator);

            var story = new Story
            {
                StoryId = new Guid("5593238f-87e6-4e86-93fc-ab79b8804444"),
                RecordVersion = 123
            };
            
            A.CallTo(() => storyRepository.DeleteStorySoftAsync(A<Core.Entities.Story>._))
                .DoesNothing();

            //Act
            await storyService.RemoveStorySoftAsync(story);

            //Assert
            A.CallTo(() => storyRepository.DeleteStorySoftAsync(A<Core.Entities.Story>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldRemoveStoryAsync()
        {
            //Arrange
            var storyRepository = A.Fake<IStoryRepository>();
            var sprintRepository = A.Fake<ISprintRepository>();        
            var storyHistoryRepository = A.Fake<IStoryHistoryRepository>();
            var userRepository = A.Fake<IUserRepository>();
            var storyMapper = new StoryMapper(new StoryHistoryMapper());
            var storyAggregator = new StoryAggregator();

            var storyService = new StoryService(storyRepository, sprintRepository, storyHistoryRepository, userRepository, storyMapper, storyAggregator);
            
            var storyId = new Guid("5593238f-87e6-4e86-93fc-ab79b8804444");

            A.CallTo(() => storyRepository.DeleteAsync(A<Expression<Func<Core.Entities.Story, bool>>>._))
                .DoesNothing();
            A.CallTo(() => storyHistoryRepository.DeleteAsync(A<Expression<Func<Core.Entities.StoryHistory, bool>>>._))
                .DoesNothing();
            
            //Act
            await storyService.RemoveStoryAsync(storyId);

            //Assert
            A.CallTo(() => storyRepository.DeleteAsync(A<Expression<Func<Core.Entities.Story, bool>>>._))
                .MustHaveHappenedOnceExactly();
            A.CallTo(() => storyHistoryRepository.DeleteAsync(A<Expression<Func<Core.Entities.StoryHistory, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }
        
        private static void AssertStoryModelProperties(Story expectedModel, Story result)
        {
            Assert.Equal(expectedModel.StoryId, result.StoryId);
            Assert.Equal(expectedModel.UserId, result.UserId);
            Assert.Equal(expectedModel.SprintId, result.SprintId);
            Assert.Equal(expectedModel.Title, result.Title);
            Assert.Equal(expectedModel.Description, result.Description);
            Assert.Equal(expectedModel.StoryPriority.ToString(), result.StoryPriority.ToString());
            Assert.Equal(expectedModel.ColumnType.ToString(), result.ColumnType.ToString());
            Assert.Equal(expectedModel.CreationDate, result.CreationDate);
            Assert.Equal(expectedModel.IsDeleted, result.IsDeleted);
            Assert.Equal(expectedModel.IsBlocked, result.IsBlocked);
            Assert.Equal(expectedModel.IsReady, result.IsReady);
            Assert.Equal(expectedModel.Notes, result.Notes);
            Assert.Equal(expectedModel.Estimate, result.Estimate);
            Assert.Equal(expectedModel.RecordVersion, result.RecordVersion);
        }
    }
}