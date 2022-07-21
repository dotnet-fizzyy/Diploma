using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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
using WebAPI.Models.Models.Result;

using StoryEntity = WebAPI.Core.Entities.Story;
using StoryModel = WebAPI.Models.Models.Models.Story;
using SprintEntity = WebAPI.Core.Entities.Sprint;
using UserEntity = WebAPI.Core.Entities.User;

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

        public async Task<CollectionResponse<StoryModel>> GetStoriesFromEpicAsync(Guid epicId, Guid? teamId)
        {
            var storyEntities = await _storyRepository.GetStoriesByEpicAndTeamIds(epicId, teamId);

            var collectionResponse = new CollectionResponse<StoryModel>
            {
                Items = storyEntities.Select(StoryMapper.Map).ToList()
            };

            return collectionResponse;
        }

        public async Task<CollectionResponse<StoryModel>> SortStories(
            Guid epicId, 
            Guid teamId,
            Guid? sprintId,
            string sortType,
            OrderType orderType)
        {
            List<StoryEntity> storyEntities;

            if (sprintId.HasValue)
            {
                storyEntities = await _storyRepository.SearchForMultipleItemsAsync(story => 
                                            sprintId == story.SprintId && 
                                            story.TeamId == teamId);
            }
            else
            {
                storyEntities = await _storyRepository.GetStoriesByEpicAndTeamIds(epicId, teamId);
            }
            
            if (!storyEntities.Any())
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND, 
                    ExceptionMessageGenerator.GetMissingEntitiesMessage($"{nameof(epicId)} and ${nameof(sprintId)}"));
            }

            storyEntities = StoryUtilities.SortStoriesByCriteria(storyEntities, sortType, orderType);
            
            var collectionResponse = new CollectionResponse<StoryModel>
            {
                Items = storyEntities.Select(StoryMapper.Map).ToList()
            };

            return collectionResponse;
        }

        public async Task<CollectionResponse<StoryModel>> GetStoriesFromSprintAsync(Guid sprintId)
        {
            var storyEntities = await _storyRepository.SearchForMultipleItemsAsync(
                story => story.SprintId == sprintId);

            var collectionResponse = new CollectionResponse<StoryModel>
            {
                Items = storyEntities.Select(StoryMapper.Map).ToList()
            };

            return collectionResponse;
        }

        public async Task<StoryModel> GetStoryByIdAsync(Guid storyId)
        {
            var storyEntity = await SearchForStoryByIdAsync(storyId);

            var storyModel = StoryMapper.Map(storyEntity);
            
            return storyModel;
        }

        public async Task<FullStory> GetFullStoryDescriptionAsync(Guid storyId)
        {
            var storyEntity = await SearchForStoryByIdAsync(storyId, include => include.StoryHistories);

            var storyFullModel = StoryMapper.MapToFullModel(storyEntity);

            return storyFullModel;
        }

        public async Task<StoryModel> CreateStoryAsync(StoryModel story, string userName)
        {
            var storyEntity = StoryMapper.Map(story);

            var createdStoryEntity = await _storyRepository.CreateAsync(storyEntity);
            
            await _storyHistoryRepository.CreateAsync(
                StoryHistoryUtilities.GetStoryHistoryForCreation(userName, createdStoryEntity.Id)
            );

            var storyModel = StoryMapper.Map(createdStoryEntity);
            
            return storyModel;
        }

        public async Task<StoryModel> UpdateStoryColumnAsync(StoryModel story, string userName)
        {
            var mappedStoryEntity = StoryMapper.Map(story);

            var existingStoryEntity = await SearchForStoryByIdAsync(story.StoryId);
            
            using var scope = new TransactionScope
            (
                TransactionScopeOption.Required,
                new TransactionOptions
                {
                    IsolationLevel = IsolationLevel.Serializable,
                },
                TransactionScopeAsyncFlowOption.Enabled
            );
            
            await _storyRepository.UpdateItemFieldAsync(mappedStoryEntity, prop => prop.ColumnType); 
            await _storyHistoryRepository.CreateAsync(StoryHistoryUtilities.GetStoryHistoryForUpdate(
                userName,
                mappedStoryEntity.Id,
                StoryFields.ColumnType,
                existingStoryEntity.ColumnType.ToString(),
                mappedStoryEntity.ColumnType.ToString())
            );

            scope.Complete();
            
            existingStoryEntity.RecordVersion = mappedStoryEntity.RecordVersion;
            existingStoryEntity.ColumnType = mappedStoryEntity.ColumnType;

            var updatedStoryModel = StoryMapper.Map(existingStoryEntity);
            
            return updatedStoryModel;
        }

        public async Task<StoryModel> ChangeStoryStatusAsync(StoryModel story, string userName)
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

            var existingStoryEntity = await SearchForStoryByIdAsync(story.StoryId);

            if (string.IsNullOrWhiteSpace(story.BlockReason))
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
            else
            {
                var storyHistoryRecords = new [] 
                { 
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
                };
                
                await _storyHistoryRepository.CreateAsync(storyHistoryRecords);

                existingStoryEntity.IsBlocked = storyEntity.IsBlocked;
                existingStoryEntity.BlockReason = storyEntity.BlockReason;
            }
 
            await _storyRepository.UpdateItemAsync(existingStoryEntity);

            scope.Complete();

            var updatedStoryModel = StoryMapper.Map(existingStoryEntity);

            return updatedStoryModel;
        }

        public async Task<StoryModel> UpdatePartsOfStoryAsync(StoryModel storyUpdate, Guid userId)
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

            var storyEntity = await SearchForStoryByIdAsync(storyUpdate.StoryId);
 
            var userEntity = await _userRepository.SearchForSingleItemAsync(user => user.Id == userId);
            if (userEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND, 
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(storyUpdate.UserId)));
            }
            
            var storyUpdateEntity = StoryMapper.Map(storyUpdate);

            List<SprintEntity> sprints = null;
            List<UserEntity> users = null;

            if (storyEntity.SprintId != storyUpdateEntity.SprintId)
            {
                sprints = await _sprintRepository.SearchForMultipleItemsAsync(
                    sprint => sprint.Id == storyEntity.SprintId || 
                            sprint.Id == storyUpdateEntity.SprintId);
                if (!sprints.Any())
                {
                    throw new UserFriendlyException(
                        ErrorStatus.NOT_FOUND,
                        ExceptionMessageGenerator.GetMissingEntitiesMessage($"{nameof(storyEntity.SprintId)}"));
                }
            }

            if (storyEntity.UserId != storyUpdateEntity.UserId)
            {
                users = await _userRepository.SearchForMultipleItemsAsync(
                    user => user.Id == storyEntity.UserId || 
                         user.Id == storyUpdateEntity.UserId);
                if (!users.Any())
                {
                    throw new UserFriendlyException(
                        ErrorStatus.NOT_FOUND, 
                        ExceptionMessageGenerator.GetMissingEntitiesMessage($"{nameof(storyEntity.UserId)}"));
                }
            }
            
            var storyHistoryUpdates = new StoryAggregator().CreateStoryFromUpdateParts(
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

        public async Task RemoveStorySoftAsync(StoryModel story)
        {
            var storyEntity = StoryMapper.Map(story);
            
            await _storyRepository.UpdateItemFieldAsync(storyEntity, prop => prop.IsDeleted);
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
            
            await _storyHistoryRepository.DeleteAsync(prop => prop.StoryId == id);
            await _storyRepository.DeleteAsync(prop => prop.Id == id);

            scope.Complete();
        }


        private async Task<StoryEntity> SearchForStoryByIdAsync(
            Guid storyId, 
            Expression<Func<StoryEntity, object>> relatedEntity = null)
        {
            var storyEntity = await _storyRepository.SearchForSingleItemAsync(
                story => story.Id == storyId, 
                relatedEntity);

            if (storyEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND, 
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(storyId)));
            }

            return storyEntity;
        }
    }
}