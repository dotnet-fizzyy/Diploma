using System;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using WebAPI.ApplicationLogic.Handlers;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.ApplicationLogic.Services
{
    public class StoryService : IStoryService
    {
        private readonly IStoryRepository _storyRepository;
        private readonly IStoryMapper _storyMapper;
        private readonly IStoryHistoryRepository _storyHistoryRepository;
        private readonly IStoryHistoryMapper _storyHistoryMapper;

        public StoryService(
            IStoryRepository storyRepository, 
            IStoryMapper storyMapper, 
            IStoryHistoryRepository storyHistoryRepository,
            IStoryHistoryMapper storyHistoryMapper
        )
        {
            _storyRepository = storyRepository;
            _storyMapper = storyMapper;
            _storyHistoryRepository = storyHistoryRepository;
            _storyHistoryMapper = storyHistoryMapper;
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

        public async Task<CollectionResponse<Story>> GetStoriesByRangeAsync(Guid sprintId, int limit, int offset)
        {
            var storyEntities =
                await _storyRepository.SearchForMultipleItemsAsync(
                    x => x.SprintId == sprintId,
                    limit,
                    offset,
                    x => x.Id,
                    OrderType.Asc
                    );

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

        public async Task<CollectionResponse<Story>> GetFullStoriesByTitleTermAsync(string term, int limit, Guid userId)
        {
            var storyEntities = await _storyRepository.GetStoriesByTitleTerm(term, limit, userId);

            var storyModels = new CollectionResponse<Story>
            {
                Items = storyEntities.Select(_storyMapper.MapToModel).ToList()
            };

            return storyModels;
        }

        public async Task<CollectionResponse<StoryHistory>> GetStoryHistoryAsync(Guid storyId)
        {
            var storyHistoryEntities = await _storyHistoryRepository.SearchForMultipleItemsAsync(x => x.StoryId == storyId);

            if (!storyHistoryEntities.Any())
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntitiesMessage(nameof(storyId)));
            }
            
            var collectionResponse = new CollectionResponse<StoryHistory>
            {
                Items = storyHistoryEntities
                    .Select(_storyHistoryMapper.MapToModel)
                    .OrderBy(x => x.CreationDate)
                    .ToList(),
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

        public async Task<Story> CreateStoryAsync(Story story, Guid userId)
        {
            var storyEntity = _storyMapper.MapToEntity(story);

            var createdStoryEntity = await _storyRepository.CreateAsync(storyEntity);
            await _storyHistoryRepository.CreateAsync(StoryHistoryGenerator.GetStoryHistoryForCreation(userId, createdStoryEntity.Id));
            
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

        public async Task<Story> UpdatePartsOfStoryAsync(StoryUpdate storyUpdate, Guid userId)
        {
            var storyHistoryItems = _storyHistoryMapper.MapToStoryEntityParts(storyUpdate, userId);
            var storyEntity = _storyMapper.MapToEntity(storyUpdate.Story);

            await _storyHistoryRepository.CreateAsync(storyHistoryItems);

            var updatedStory = await _storyRepository.UpdateItemAsync(storyEntity);

            var storyModel = _storyMapper.MapToModel(updatedStory);
            
            return storyModel;
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