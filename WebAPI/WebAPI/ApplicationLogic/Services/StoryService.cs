using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using WebAPI.ApplicationLogic.Handlers;
using WebAPI.ApplicationLogic.Utilities;
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
        private readonly IStoryMapper _storyMapper;
        private readonly IStoryHistoryRepository _storyHistoryRepository;
        private readonly IStoryAggregator _storyAggregator;

        public StoryService(
            IStoryRepository storyRepository, 
            IStoryMapper storyMapper, 
            IStoryHistoryRepository storyHistoryRepository,
            IStoryAggregator storyAggregator
        )
        {
            _storyRepository = storyRepository;
            _storyMapper = storyMapper;
            _storyHistoryRepository = storyHistoryRepository;
            _storyAggregator = storyAggregator;
        }

        public async Task<CollectionResponse<Story>> GetStoriesAsync()
        {
            var storyEntities = await _storyRepository.SearchForMultipleItemsAsync();

            var collectionResponse = new CollectionResponse<Story>
            {
                Items = storyEntities.Select(_storyMapper.MapToModel).ToList()
            };

            return collectionResponse;
        }

        public async Task<CollectionResponse<Story>> GetStoriesFromEpicAsync(Guid epicId)
        {
            var storyEntities = await _storyRepository.GetStoriesByEpicId(epicId);
            if (!storyEntities.Any())
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntitiesMessage(nameof(epicId)));
            }

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
            if (!storyEntities.Any())
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntitiesMessage(nameof(sprintId)));
            }
            
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
            var storyEntity =
                await _storyRepository.SearchForSingleItemAsync(
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
            var storyEntity = _storyMapper.MapToEntity(story);

            var createdStoryEntity = await _storyRepository.CreateAsync(storyEntity);
            await _storyHistoryRepository.CreateAsync(StoryHistoryGenerator.GetStoryHistoryForCreation(userName, createdStoryEntity.Id));
            
            var storyModel = _storyMapper.MapToModel(createdStoryEntity);
            
            return storyModel;
        }

        public async Task<Story> UpdateStoryAsync(Story story)
        {
            var storyEntity = _storyMapper.MapToEntity(story);
            storyEntity.CreationDate = DateTime.UtcNow;

            var updatedStoryEntity = await _storyRepository.UpdateItemAsync(storyEntity);

            var storyModel = _storyMapper.MapToModel(updatedStoryEntity);
            
            return storyModel;
        }

        public async Task<Story> UpdateStoryColumnAsync(Story story)
        {
            var storyEntity = _storyMapper.MapToEntity(story);

            await _storyRepository.UpdateStoryColumn(storyEntity);
            var foundStoryEntity = await _storyRepository.SearchForSingleItemAsync(x => x.Id == storyEntity.Id);
            
            var updatedStoryModel = _storyMapper.MapToModel(foundStoryEntity);
            
            return updatedStoryModel;
        }

        public async Task<Story> ChangeStoryStatusAsync(Story story)
        {
            var storyEntity = _storyMapper.MapToEntity(story);

            await _storyRepository.ChangeStoryStatus(storyEntity);
            var updatedStoryEntity = await _storyRepository.SearchForSingleItemAsync(x => x.Id == story.StoryId);
            
            var updatedStoryModel = _storyMapper.MapToModel(updatedStoryEntity);

            return updatedStoryModel;
        }

        public async Task<Story> UpdatePartsOfStoryAsync(Story storyUpdate, string userName)
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
            
            var storyUpdateEntity = _storyMapper.MapToEntity(storyUpdate);
            var storyHistoryUpdates = _storyAggregator.CreateStoryFromUpdateParts(storyEntity, storyUpdateEntity, userName);
            
            await _storyHistoryRepository.CreateAsync(storyHistoryUpdates);
            var updatedStory = await _storyRepository.UpdateItemAsync(storyEntity);
    
            scope.Complete();

            var storyModel = _storyMapper.MapToModel(updatedStory);
            
            return storyModel;
        }

        public async Task RemoveStorySoftAsync(Guid id)
        {
            await _storyRepository.RemoveStorySoftAsync(id);
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