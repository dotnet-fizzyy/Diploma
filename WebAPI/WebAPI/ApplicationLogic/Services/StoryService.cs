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
using WebAPI.Models.Extensions;
using WebAPI.Models.Models.Result;

using StoryEntity = WebAPI.Core.Entities.Story;
using StoryModel = WebAPI.Models.Basic.Story;
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

        public async Task<CollectionResponse<StoryModel>> GetStoriesFromEpicAssignedToTeamAsync(Guid epicId, Guid teamId)
        {
            var storyEntities = await _unitOfWork.StoryRepository.GetStoriesByEpicAndTeamIds(epicId, teamId);

            return new CollectionResponse<StoryModel>
            {
                Items = storyEntities.Select(StoryMapper.Map).ToList()
            };
        }

        public async Task<CollectionResponse<StoryModel>> SortStories(
            Guid epicId, 
            Guid teamId,
            Guid? sprintId,
            string sortType,
            OrderType orderType)
        {
            List<StoryEntity> stories;

            if (sprintId.HasValue)
            {
                stories = await _unitOfWork.StoryRepository
                    .SearchForMultipleItemsAsync(story => sprintId == story.SprintId && 
                                                                   story.TeamId == teamId);
            }
            else
            {
                stories = await _unitOfWork.StoryRepository.GetStoriesByEpicAndTeamIds(epicId, teamId);
            }
            
            if (!stories.Any())
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND, 
                    ExceptionMessageGenerator.GetMissingEntitiesMessage($"{nameof(epicId)} and ${nameof(sprintId)}"));
            }

            stories = StoryUtilities.SortStoriesByCriteria(stories, sortType, orderType);
            
            return new CollectionResponse<StoryModel>
            {
                Items = stories.Select(StoryMapper.Map).ToList()
            };
        }

        public async Task<CollectionResponse<StoryModel>> GetStoriesFromSprintAsync(Guid sprintId)
        {
            var storyEntities = await _unitOfWork.StoryRepository
                .SearchForMultipleItemsAsync(story => story.SprintId == sprintId);

            return new CollectionResponse<StoryModel>
            {
                Items = storyEntities.Select(StoryMapper.Map).ToList()
            };
        }

        public async Task<StoryModel> GetByIdAsync(Guid storyId)
        {
            var storyEntity = await SearchForStoryByIdAsync(storyId, includeTracking: false);

            return StoryMapper.Map(storyEntity);
        }

        public async Task<FullStory> GetFullDescriptionAsync(Guid storyId)
        {
            var storyEntity = await SearchForStoryByIdAsync(
                storyId,
                includeTracking: false,
                include => include.StoryHistories);

            return StoryMapper.MapToFullModel(storyEntity);
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

            return StoryMapper.Map(storyEntity);
        }

        public async Task<StoryModel> UpdateColumnAsync(StoryModel story, string username)
        {
            var storyEntityToUpdate = StoryMapper.Map(story);

            var originalStoryEntity = await SearchForStoryByIdAsync(story.StoryId, includeTracking: true);
            
            using var scope = new TransactionScope
            (
                TransactionScopeOption.Required,
                new TransactionOptions
                {
                    IsolationLevel = IsolationLevel.Serializable
                },
                TransactionScopeAsyncFlowOption.Enabled
            );
            
            _unitOfWork.StoryRepository.UpdateItem(storyEntityToUpdate, prop => prop.ColumnType);
            await CreateStoryHistoryRecordWithNewColumnAsync(storyEntityToUpdate, originalStoryEntity, username);

            await _unitOfWork.CommitAsync();
            
            scope.Complete();

            return StoryMapper.Map(storyEntityToUpdate);
        }

        public async Task<StoryModel> ChangeStatusAsync(StoryModel story, string username)
        {
            var storyEntityToUpdate = StoryMapper.Map(story);

            using var scope = new TransactionScope
            (
                TransactionScopeOption.Required,
                new TransactionOptions
                {
                    IsolationLevel = IsolationLevel.Serializable,
                },
                TransactionScopeAsyncFlowOption.Enabled
            );

            var originalStoryEntity = await SearchForStoryByIdAsync(story.StoryId, includeTracking: true);

            if (string.IsNullOrWhiteSpace(story.BlockReason))
            {
                await CreateStoryHistoryRecordWithReadyStatusAsync(storyEntityToUpdate, originalStoryEntity, username);
            }
            else
            {
                await CreateStoryHistoryRecordWithBlockStatusAsync(storyEntityToUpdate, originalStoryEntity, username);
            }
 
            _unitOfWork.StoryRepository.UpdateItem(originalStoryEntity);

            await _unitOfWork.CommitAsync();
            
            scope.Complete();

            return StoryMapper.Map(originalStoryEntity);
        }

        public async Task<StoryModel> UpdateAsync(StoryModel storyUpdate, Guid userId)
        {
            var storyToUpdateEntity = StoryMapper.Map(storyUpdate);
            
            using var scope = new TransactionScope
            (
                TransactionScopeOption.Required,
                new TransactionOptions
                {
                    IsolationLevel = IsolationLevel.Serializable,
                },
                TransactionScopeAsyncFlowOption.Enabled
            );

            var originalStoryEntity = SearchForStoryByIdAsync(storyUpdate.StoryId, includeTracking: true);
            var userEntity = SearchForUserByIdAsync(userId);

            await Task.WhenAll(originalStoryEntity, userEntity);
            
            var sprints = GetSprintsForUpdatingStory(
                storyToUpdateEntity.SprintId, 
                originalStoryEntity.Result.SprintId);
            var users = GetUsersForUpdatingStory(
                storyToUpdateEntity.UserId, 
                originalStoryEntity.Result.UserId);

            await Task.WhenAll(sprints, users);

            var storyHistoryUpdates = new StoryAggregator().CreateStoryFromUpdateParts(
                originalStoryEntity.Result, 
                storyToUpdateEntity, 
                userEntity.Result.UserName, 
                sprints.Result, 
                users.Result);
            
            await _unitOfWork.StoryHistoryRepository.CreateAsync(storyHistoryUpdates);
            _unitOfWork.StoryRepository.UpdateItem(
                storyToUpdateEntity,
                prop => prop.Title,
                prop => prop.Description,
                prop => prop.Notes,
                prop => prop.IsBlocked,
                prop => prop.BlockReason,
                prop => prop.IsReady,
                prop => prop.RequiredPosition,
                prop => prop.IsDeleted,
                prop => prop.TeamId,
                prop => prop.SprintId,
                prop => prop.UserId);
    
            await _unitOfWork.CommitAsync();
            
            scope.Complete();

            return StoryMapper.Map(storyToUpdateEntity);
        }

        public async Task SoftRemoveAsync(Guid id)
        {
            var storyEntity = new StoryEntity
            {
                Id = id,
                IsDeleted = true
            };
            
            _unitOfWork.StoryRepository.UpdateItem(storyEntity, prop => prop.IsDeleted);
            
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
            
            _unitOfWork.StoryHistoryRepository.Remove(storyHistory => storyHistory.StoryId == id);
            _unitOfWork.StoryRepository.Remove(story => story.Id == id);

            await _unitOfWork.CommitAsync();

            scope.Complete();
        }


        private async Task<StoryEntity> SearchForStoryByIdAsync(
            Guid storyId, 
            bool includeTracking,
            Expression<Func<StoryEntity, object>> relatedEntity = null)
        {
            var storyEntity = await _unitOfWork.StoryRepository.SearchForItemById(
                storyId,
                includeTracking,
                relatedEntity);

            if (storyEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND, 
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(storyId)));
            }

            return storyEntity;
        }

        private async Task CreateStoryHistoryRecordWithReadyStatusAsync(
            StoryEntity storyToUpdate, 
            StoryEntity originalStory, 
            string username)
        {
            originalStory.IsReady = storyToUpdate.IsReady;
                
            var storyHistoryRecord = StoryHistoryUtilities.GetStoryHistoryForUpdate(
                username,
                originalStory.Id,
                StoryFields.IsReady,
                storyToUpdate.IsReady.ToString(),
                originalStory.IsReady.ToString());
                
            await _unitOfWork.StoryHistoryRepository.CreateAsync(storyHistoryRecord);
        }
        
        private async Task CreateStoryHistoryRecordWithBlockStatusAsync(
            StoryEntity storyToUpdate, 
            StoryEntity originalStory, 
            string username)
        {
            originalStory.IsBlocked = storyToUpdate.IsBlocked;
            originalStory.BlockReason = storyToUpdate.BlockReason;

            var storyHistoryRecords = new []
            {
                StoryHistoryUtilities.GetStoryHistoryForUpdate(
                    username,
                    storyToUpdate.Id,
                    StoryFields.IsBlocked,
                    originalStory.IsBlocked.ToString(),
                    storyToUpdate.IsBlocked.ToString()),
                StoryHistoryUtilities.GetStoryHistoryForUpdate(
                    username,
                    storyToUpdate.Id,
                    StoryFields.BlockReason,
                    originalStory.BlockReason,
                    storyToUpdate.BlockReason)
            };

            await _unitOfWork.StoryHistoryRepository.CreateAsync(storyHistoryRecords);
        }

        private async Task CreateStoryHistoryRecordWithNewColumnAsync(
            StoryEntity storyToUpdate, 
            StoryEntity originalStory, 
            string username)
        {
            var updateColumnHistoryRecord = StoryHistoryUtilities.GetStoryHistoryForUpdate(
                username,
                storyToUpdate.Id,
                StoryFields.ColumnType,
                originalStory.ColumnType.ToString(),
                storyToUpdate.ColumnType.ToString());
            
            await _unitOfWork.StoryHistoryRepository.CreateAsync(updateColumnHistoryRecord);
        }

        private async Task<UserEntity> SearchForUserByIdAsync(Guid userId)
        {
            var user = await _unitOfWork.UserRepository.SearchForItemById(userId, includeTracking: true);
            
            if (user == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND, 
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(userId)));
            }

            return user;
        }

        private async Task<List<SprintEntity>> GetSprintsForUpdatingStory(
            Guid? newStorySprintId, 
            Guid? originalStorySprintId)
        {
            if (newStorySprintId == originalStorySprintId)
            {
                return null;
            }

            var sprints = await _unitOfWork.SprintRepository
                .SearchForMultipleItemsAsync(sprint => sprint.Id == newStorySprintId || 
                                                       sprint.Id == originalStorySprintId);

            if (!sprints.Any())
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND,
                    ExceptionMessageGenerator.GetMissingEntitiesMessage(
                        $"{nameof(newStorySprintId)} or ${nameof(originalStorySprintId)}")
                    );
            }
            
            return sprints;
        }
        
        private async Task<List<UserEntity>> GetUsersForUpdatingStory(
            Guid? newStoryOwnerId, 
            Guid? originalStoryOwnerId)
        {
            if (newStoryOwnerId == originalStoryOwnerId)
            {
                return null;
            }

            var sprints = await _unitOfWork.UserRepository
                .SearchForMultipleItemsAsync(user => user.Id == newStoryOwnerId || 
                                                     user.Id == originalStoryOwnerId);

            if (!sprints.Any())
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND, 
                    ExceptionMessageGenerator.GetMissingEntitiesMessage(
                        $"{nameof(newStoryOwnerId)} or ${nameof(originalStoryOwnerId)}")
                    );
            }
            
            return sprints;
        }
    }
}