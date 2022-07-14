using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using WebAPI.ApplicationLogic.Aggregators;
using WebAPI.ApplicationLogic.Mappers;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Constants;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
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

        public StoryService(
            IStoryRepository storyRepository, 
            ISprintRepository sprintRepository,
            IStoryHistoryRepository storyHistoryRepository,
            IUserRepository userRepository)
        {
            _storyRepository = storyRepository;
            _sprintRepository = sprintRepository;
            _storyHistoryRepository = storyHistoryRepository;
            _userRepository = userRepository;
        }

        public async Task<CollectionResponse<Story>> GetStoriesFromEpicAsync(Guid epicId, Guid? teamId)
        {
            var storyEntities = await _storyRepository.GetStoriesByEpicId(epicId, teamId);

            var collectionResponse = new CollectionResponse<Story>
            {
                Items = storyEntities.Select(StoryMapper.Map).ToList()
            };

            return collectionResponse;
        }

        public async Task<CollectionResponse<Story>> SortStories(Guid epicId, Guid teamId, Guid? sprintId, string sortType, OrderType orderType)
        {
            List<Core.Entities.Story> storyEntities;

            if (sprintId.HasValue)
            {
                storyEntities = await _storyRepository.SearchForMultipleItemsAsync(story => 
                                            sprintId == story.SprintId && 
                                            story.TeamId == teamId);
            }
            else
            {
                storyEntities = await _storyRepository.GetStoriesByEpicId(epicId, teamId);
            }
            
            if (!storyEntities.Any())
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntitiesMessage($"{nameof(epicId)} and ${nameof(sprintId)}"));
            }

            storyEntities = StoryUtilities.SortStoriesByCriteria(storyEntities, sortType, orderType);
            
            var collectionResponse = new CollectionResponse<Story>
            {
                Items = storyEntities.Select(StoryMapper.Map).ToList()
            };

            return collectionResponse;
        }

        public async Task<CollectionResponse<Story>> GetStoriesFromSprintAsync(Guid sprintId)
        {
            var storyEntities = await _storyRepository.SearchForMultipleItemsAsync(x => x.SprintId == sprintId);

            var collectionResponse = new CollectionResponse<Story>
            {
                Items = storyEntities.Select(StoryMapper.Map).ToList()
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
            
            var storyModel = StoryMapper.Map(storyEntity);
            
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
            
            var storyFullModel = StoryMapper.MapToFullModel(storyEntity);

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
            
            var storyEntity = StoryMapper.Map(story);

            var createdStoryEntity = await _storyRepository.CreateAsync(storyEntity);
            await _storyHistoryRepository.CreateAsync(StoryHistoryUtilities.GetStoryHistoryForCreation(userName, createdStoryEntity.Id));
            
            tr.Complete();
            
            var storyModel = StoryMapper.Map(createdStoryEntity);
            
            return storyModel;
        }

        public async Task<Story> UpdateStoryColumnAsync(Story story, string userName)
        {
            var mappedStoryEntity = StoryMapper.Map(story);
            
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
            
            var updatedStory = await _storyRepository.UpdateStoryColumn(mappedStoryEntity); 
            await _storyHistoryRepository.CreateAsync(StoryHistoryUtilities.GetStoryHistoryForUpdate(
                userName, 
                mappedStoryEntity.Id, 
                StoryFields.ColumnType, 
                existingStoryEntity.ColumnType.ToString(), 
                mappedStoryEntity.ColumnType.ToString())
            );

            scope.Complete();

            existingStoryEntity.RecordVersion = updatedStory.RecordVersion;
            existingStoryEntity.ColumnType = updatedStory.ColumnType;

            var updatedStoryModel = StoryMapper.Map(existingStoryEntity);
            
            return updatedStoryModel;
        }

        public async Task<Story> ChangeStoryStatusAsync(Story story, string userName)
        {
            var storyEntity = StoryMapper.Map(story);

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
                    StoryHistoryUtilities.GetStoryHistoryForUpdate(
                    userName, 
                    storyEntity.Id, 
                    StoryFields.IsBlocked, 
                    existingStoryEntity.IsBlocked.ToString(), 
                    storyEntity.IsBlocked.ToString()),
                    StoryHistoryUtilities.GetStoryHistoryForUpdate(
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
                await _storyHistoryRepository.CreateAsync(StoryHistoryUtilities.GetStoryHistoryForUpdate(
                    userName, 
                    storyEntity.Id, 
                    StoryFields.IsReady, 
                    existingStoryEntity.IsReady.ToString(), 
                    storyEntity.IsReady.ToString())
                );
                
                existingStoryEntity.IsReady = storyEntity.IsReady;
            }

            scope.Complete();

            var updatedStoryModel = StoryMapper.Map(existingStoryEntity);

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
            
            var storyUpdateEntity = StoryMapper.Map(storyUpdate);

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
            
            var storyHistoryUpdates = new StoryAggregator()
                .CreateStoryFromUpdateParts(
                    storyEntity, 
                    storyUpdateEntity, 
                    userEntity.UserName, 
                    sprints, 
                    users
                );
            
            await _storyHistoryRepository.CreateAsync(storyHistoryUpdates);
            var updatedStory = await _storyRepository.UpdateItemAsync(storyUpdateEntity);
    
            scope.Complete();

            var storyModel = StoryMapper.Map(updatedStory);
            
            return storyModel;
        }

        public async Task RemoveStorySoftAsync(Story story)
        {
            var storyEntity = StoryMapper.Map(story);
            
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