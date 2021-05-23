using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using WebAPI.ApplicationLogic.Handlers;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Constants;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Aggregators;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.ApplicationLogic.Services
{
    public class StoryService : IStoryService
    {
        private readonly IStoryRepository _storyRepository;
        private readonly ISprintRepository _sprintRepository;        
        private readonly IStoryHistoryRepository _storyHistoryRepository;
        private readonly IUserRepository _userRepository;
        private readonly IStoryMapper _storyMapper;
        private readonly IStoryAggregator _storyAggregator;

        public StoryService(
            IStoryRepository storyRepository, 
            ISprintRepository sprintRepository,
            IStoryHistoryRepository storyHistoryRepository,
            IUserRepository userRepository,
            IStoryMapper storyMapper, 
            IStoryAggregator storyAggregator
        )
        {
            _storyRepository = storyRepository;
            _sprintRepository = sprintRepository;
            _storyHistoryRepository = storyHistoryRepository;
            _userRepository = userRepository;
            _storyMapper = storyMapper;
            _storyAggregator = storyAggregator;
        }

        public async Task<CollectionResponse<Story>> GetStoriesFromEpicAsync(Guid epicId)
        {
            var storyEntities = await _storyRepository.GetStoriesByEpicId(epicId);

            var collectionResponse = new CollectionResponse<Story>
            {
                Items = storyEntities.Select(_storyMapper.MapToModel).ToList()
            };

            return collectionResponse;
        }

        public async Task<CollectionResponse<Story>> SortStories(Guid epicId, Guid? sprintId, string sortType, OrderType orderType)
        {
            List<Core.Entities.Story> storyEntities;
            if (sprintId.HasValue)
            {
                storyEntities = await _storyRepository.SearchForMultipleItemsAsync(x => sprintId == x.SprintId);
            }
            else
            {
                storyEntities = await _storyRepository.GetStoriesByEpicId(epicId);
            }
            
            if (!storyEntities.Any())
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntitiesMessage($"{nameof(epicId)} and ${nameof(sprintId)}"));
            }

            storyEntities = StoryHandler.SortStoriesByCriteria(storyEntities, sortType, orderType);
            
            var collectionResponse = new CollectionResponse<Story>
            {
                Items = storyEntities.Select(_storyMapper.MapToModel).ToList()
            };

            return collectionResponse;
        }

        public async Task<CollectionResponse<Story>> GetStoriesFromSprintAsync(Guid sprintId)
        {
            var storyEntities = await _storyRepository.SearchForMultipleItemsAsync(x => x.SprintId == sprintId);

            var collectionResponse = new CollectionResponse<Story>
            {
                Items = storyEntities.Select(_storyMapper.MapToModel).ToList()
            };

            return collectionResponse;
        }

        public async Task<Story> GetStoryByIdAsync(Guid storyId)
        {
            var storyEntity = await _storyRepository.SearchForSingleItemAsync(story => story.Id == storyId);

            if (storyEntity == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntityMessage(nameof(storyId)));
            }
            
            var storyModel = _storyMapper.MapToModel(storyEntity);
            
            return storyModel;
        }

        public async Task<FullStory> GetFullStoryDescriptionAsync(Guid storyId)
        {
            var storyEntity = await _storyRepository.SearchForSingleItemAsync(
                    story => story.Id == storyId,
                include => include.StoryHistories
                );

            if (storyEntity == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntityMessage(nameof(storyId)));
            }
            
            var storyFullModel = _storyMapper.MapToFullModel(storyEntity);

            return storyFullModel;
        }

        public async Task<Story> CreateStoryAsync(Story story, string userName)
        {
            using var tr = new TransactionScope(
                TransactionScopeOption.Required, 
                new TransactionOptions
                {
                    IsolationLevel = IsolationLevel.Serializable
                }, 
                TransactionScopeAsyncFlowOption.Enabled
            );
            
            var storyEntity = _storyMapper.MapToEntity(story);

            var createdStoryEntity = await _storyRepository.CreateAsync(storyEntity);
            await _storyHistoryRepository.CreateAsync(StoryHistoryGenerator.GetStoryHistoryForCreation(userName, createdStoryEntity.Id));
            
            tr.Complete();
            
            var storyModel = _storyMapper.MapToModel(createdStoryEntity);
            
            return storyModel;
        }

        public async Task<Story> UpdateStoryColumnAsync(Story story, string userName)
        {
            var mappedStoryEntity = _storyMapper.MapToEntity(story);
            
            using var scope = new TransactionScope
            (
                TransactionScopeOption.Required,
                new TransactionOptions
                {
                    IsolationLevel = IsolationLevel.Serializable,
                },
                TransactionScopeAsyncFlowOption.Enabled
            );

            var existingStoryEntity = await _storyRepository.SearchForSingleItemAsync(x => x.Id == story.StoryId);
            if (existingStoryEntity == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntityMessage(nameof(story.StoryId)));
            }
            
            await _storyRepository.UpdateStoryColumn(mappedStoryEntity); 
            await _storyHistoryRepository.CreateAsync(StoryHistoryGenerator.GetStoryHistoryForUpdate(
                userName, 
                mappedStoryEntity.Id, 
                StoryFields.ColumnType, 
                existingStoryEntity.ColumnType.ToString(), 
                mappedStoryEntity.ColumnType.ToString())
            );

            scope.Complete();

            existingStoryEntity.ColumnType = mappedStoryEntity.ColumnType;
            var updatedStoryModel = _storyMapper.MapToModel(existingStoryEntity);
            
            return updatedStoryModel;
        }

        public async Task<Story> ChangeStoryStatusAsync(Story story, string userName)
        {
            var storyEntity = _storyMapper.MapToEntity(story);

            using var scope = new TransactionScope
            (
                TransactionScopeOption.Required,
                new TransactionOptions
                {
                    IsolationLevel = IsolationLevel.Serializable,
                },
                TransactionScopeAsyncFlowOption.Enabled
            );
            
            var existingStoryEntity = await _storyRepository.SearchForSingleItemAsync(x => x.Id == story.StoryId);
            if (existingStoryEntity == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntityMessage(nameof(story.StoryId)));
            }

            await _storyRepository.ChangeStoryStatus(storyEntity);

            if (!string.IsNullOrEmpty(story.BlockReason))
            {
                await _storyHistoryRepository.CreateAsync(new []{
                    StoryHistoryGenerator.GetStoryHistoryForUpdate(
                    userName, 
                    storyEntity.Id, 
                    StoryFields.IsBlocked, 
                    existingStoryEntity.IsBlocked.ToString(), 
                    storyEntity.IsBlocked.ToString()),
                    StoryHistoryGenerator.GetStoryHistoryForUpdate(
                        userName, 
                        storyEntity.Id, 
                        StoryFields.BlockReason, 
                        existingStoryEntity.BlockReason, 
                        storyEntity.BlockReason)
                });

                existingStoryEntity.IsBlocked = storyEntity.IsBlocked;
                existingStoryEntity.BlockReason = storyEntity.BlockReason;
            }
            else
            {
                await _storyHistoryRepository.CreateAsync(StoryHistoryGenerator.GetStoryHistoryForUpdate(
                    userName, 
                    storyEntity.Id, 
                    StoryFields.IsReady, 
                    existingStoryEntity.IsReady.ToString(), 
                    storyEntity.IsReady.ToString())
                );
                
                existingStoryEntity.IsReady = storyEntity.IsReady;
            }

            scope.Complete();

            var updatedStoryModel = _storyMapper.MapToModel(existingStoryEntity);

            return updatedStoryModel;
        }

        public async Task<Story> UpdatePartsOfStoryAsync(Story storyUpdate, Guid userId)
        {
            using var scope = new TransactionScope
            (
                TransactionScopeOption.Required,
                new TransactionOptions
                {
                    IsolationLevel = IsolationLevel.Serializable,
                },
                TransactionScopeAsyncFlowOption.Enabled
            );
            
            var storyEntity = await _storyRepository.SearchForSingleItemAsync(x => x.Id == storyUpdate.StoryId);
            if (storyEntity == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntityMessage(nameof(storyUpdate.StoryId)));
            }
            var userEntity = await _userRepository.SearchForSingleItemAsync(x => x.Id == userId);
            if (userEntity == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntityMessage(nameof(storyUpdate.UserId)));
            }
            
            var storyUpdateEntity = _storyMapper.MapToEntity(storyUpdate);

            List<Core.Entities.Sprint> sprints = null;
            List<Core.Entities.User> users = null;
            if (storyEntity.SprintId != storyUpdateEntity.SprintId)
            {
                sprints = await _sprintRepository.SearchForMultipleItemsAsync(x => x.Id == storyEntity.SprintId || x.Id == storyUpdateEntity.SprintId);
                if (!sprints.Any())
                {
                    throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntitiesMessage($"{nameof(storyEntity.SprintId)}s"));
                }
            }

            if (storyEntity.UserId != storyUpdateEntity.UserId)
            {
                users = await _userRepository.SearchForMultipleItemsAsync(x => x.Id == storyEntity.UserId || x.Id == storyUpdateEntity.UserId);
                if (!users.Any())
                {
                    throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntitiesMessage($"{nameof(storyEntity.UserId)}s"));
                }
            }
            
            var storyHistoryUpdates = _storyAggregator.CreateStoryFromUpdateParts(storyEntity, storyUpdateEntity, userEntity.UserName, sprints, users);
            
            await _storyHistoryRepository.CreateAsync(storyHistoryUpdates);
            var updatedStory = await _storyRepository.UpdateItemAsync(storyUpdateEntity);
    
            scope.Complete();

            var storyModel = _storyMapper.MapToModel(updatedStory);
            
            return storyModel;
        }

        public async Task RemoveStorySoftAsync(Story story)
        {
            var storyEntity = _storyMapper.MapToEntity(story);
            
            await _storyRepository.DeleteStorySoftAsync(storyEntity);
        }

        public async Task RemoveStoryAsync(Guid id)
        {
            using var scope = new TransactionScope
            (
                TransactionScopeOption.Required,
                new TransactionOptions
                {
                    IsolationLevel = IsolationLevel.Serializable,
                },
                TransactionScopeAsyncFlowOption.Enabled
            );
            
            await _storyHistoryRepository.DeleteAsync(x => x.StoryId == id);
            await _storyRepository.DeleteAsync(x => x.Id == id);

            scope.Complete();
        }
    }
}