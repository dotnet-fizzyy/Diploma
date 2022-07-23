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
        private readonly IUnitOfWork _unitOfWork;

        public StoryService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<CollectionResponse<StoryModel>> GetStoriesFromEpicAsync(Guid epicId, Guid? teamId)
        {
            var storyEntities = await _unitOfWork.StoryRepository.GetStoriesByEpicAndTeamIds(epicId, teamId);

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
                storyEntities = await _unitOfWork.StoryRepository
                    .SearchForMultipleItemsAsync(story => sprintId == story.SprintId && 
                                                                   story.TeamId == teamId);
            }
            else
            {
                storyEntities = await _unitOfWork.StoryRepository.GetStoriesByEpicAndTeamIds(epicId, teamId);
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
            var storyEntities = await _unitOfWork.StoryRepository
                .SearchForMultipleItemsAsync(story => story.SprintId == sprintId);

            var collectionResponse = new CollectionResponse<StoryModel>
            {
                Items = storyEntities.Select(StoryMapper.Map).ToList()
            };

            return collectionResponse;
        }

        public async Task<StoryModel> GetByIdAsync(Guid storyId)
        {
            var storyEntity = await SearchForStoryByIdAsync(storyId);

            var storyModel = StoryMapper.Map(storyEntity);
            
            return storyModel;
        }

        public async Task<FullStory> GetFullDescriptionAsync(Guid storyId)
        {
            var storyEntity = await SearchForStoryByIdAsync(storyId, include => include.StoryHistories);

            var storyFullModel = StoryMapper.MapToFullModel(storyEntity);

            return storyFullModel;
        }

        public async Task<StoryModel> CreateAsync(StoryModel story, string username)
        {
            var storyEntity = StoryMapper.Map(story);

            await _unitOfWork.StoryRepository.CreateAsync(storyEntity);

            var storyCreationRecord = StoryHistoryUtilities.GetStoryHistoryForCreation(
                username, 
                storyEntity.Id);
            
            await _unitOfWork.StoryHistoryRepository.CreateAsync(storyCreationRecord);
            
            await _unitOfWork.CommitAsync();

            var storyModel = StoryMapper.Map(storyEntity);
            
            return storyModel;
        }

        public async Task<StoryModel> UpdateColumnAsync(StoryModel story, string username)
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
            
            _unitOfWork.StoryRepository.UpdateItemField(mappedStoryEntity, prop => prop.ColumnType);

            var updateColumnHistoryRecord = StoryHistoryUtilities.GetStoryHistoryForUpdate(
                username,
                mappedStoryEntity.Id,
                StoryFields.ColumnType,
                existingStoryEntity.ColumnType.ToString(),
                mappedStoryEntity.ColumnType.ToString());
            
            await _unitOfWork.StoryHistoryRepository.CreateAsync(updateColumnHistoryRecord);

            await _unitOfWork.CommitAsync();
            
            scope.Complete();
            
            existingStoryEntity.RecordVersion = mappedStoryEntity.RecordVersion;
            existingStoryEntity.ColumnType = mappedStoryEntity.ColumnType;

            var updatedStoryModel = StoryMapper.Map(existingStoryEntity);
            
            return updatedStoryModel;
        }

        public async Task<StoryModel> ChangeStatusAsync(StoryModel story, string username)
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
                existingStoryEntity.IsReady = storyEntity.IsReady;
                
                var storyHistoryRecord = StoryHistoryUtilities.GetStoryHistoryForUpdate(
                    username,
                    storyEntity.Id,
                    StoryFields.IsReady,
                    existingStoryEntity.IsReady.ToString(),
                    storyEntity.IsReady.ToString());
                
                await _unitOfWork.StoryHistoryRepository.CreateAsync(storyHistoryRecord);
            }
            else
            {
                existingStoryEntity.IsBlocked = storyEntity.IsBlocked;
                existingStoryEntity.BlockReason = storyEntity.BlockReason;

                var storyHistoryRecords = new []
                {
                    StoryHistoryUtilities.GetStoryHistoryForUpdate(
                        username,
                        storyEntity.Id,
                        StoryFields.IsBlocked,
                        existingStoryEntity.IsBlocked.ToString(),
                        storyEntity.IsBlocked.ToString()),
                    StoryHistoryUtilities.GetStoryHistoryForUpdate(
                        username,
                        storyEntity.Id,
                        StoryFields.BlockReason,
                        existingStoryEntity.BlockReason,
                        storyEntity.BlockReason)
                };

                await _unitOfWork.StoryHistoryRepository.CreateAsync(storyHistoryRecords);
            }
 
            _unitOfWork.StoryRepository.UpdateItem(existingStoryEntity);

            await _unitOfWork.CommitAsync();
            
            scope.Complete();

            var updatedStoryModel = StoryMapper.Map(existingStoryEntity);

            return updatedStoryModel;
        }

        public async Task<StoryModel> UpdateAsync(StoryModel storyUpdate, Guid userId)
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
 
            var userEntity = await _unitOfWork.UserRepository.SearchForItemById(userId);
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
                sprints = await _unitOfWork.SprintRepository.SearchForMultipleItemsAsync(
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
                users = await _unitOfWork.UserRepository.SearchForMultipleItemsAsync(
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
                users);
            
            await _unitOfWork.StoryHistoryRepository.CreateAsync(storyHistoryUpdates);
            _unitOfWork.StoryRepository.UpdateItem(storyUpdateEntity);
    
            await _unitOfWork.CommitAsync();
            
            scope.Complete();

            var storyModel = StoryMapper.Map(storyUpdateEntity);
            
            return storyModel;
        }

        public async Task SoftRemoveAsync(StoryModel story)
        {
            var storyEntity = StoryMapper.Map(story);
            
            _unitOfWork.StoryRepository.SoftRemove(storyEntity.Id);
            
            await _unitOfWork.CommitAsync();
        }

        public async Task RemoveAsync(Guid id)
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
            
            _unitOfWork.StoryHistoryRepository.Remove(prop => prop.StoryId == id);
            _unitOfWork.StoryRepository.Remove(prop => prop.Id == id);

            await _unitOfWork.CommitAsync();

            scope.Complete();
        }


        private async Task<StoryEntity> SearchForStoryByIdAsync(
            Guid storyId, 
            Expression<Func<StoryEntity, object>> relatedEntity = null)
        {
            var storyEntity = await _unitOfWork.StoryRepository.SearchForItemById(storyId, relatedEntity);

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