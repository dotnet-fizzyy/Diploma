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

        public async Task<CollectionResponse<Story>> GetStories()
        {
            var storyEntities = await _storyRepository.SearchForMultipleItemsAsync();

            var collectionResponse = new CollectionResponse<Story>
            {
                Items = storyEntities.Select(_storyMapper.MapToModel).ToList()
            };

            return collectionResponse;
        }

        public async Task<CollectionResponse<Story>> GetStoriesByRange(Guid sprintId, int limit, int offset)
        {
            var storyEntities =
                await _storyRepository.SearchForMultipleItemsAsync(
                    x => x.SprintId == sprintId,
                    limit,
                    offset,
                    x => x.Id,
                    OrderType.Asc
                    );

            if (storyEntities.Count == 0)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntitiesMessage(nameof(sprintId)));
            }
            
            var collectionResponse = new CollectionResponse<Story>
            {
                Items = storyEntities.Select(_storyMapper.MapToModel).ToList()
            };

            return collectionResponse;
        }

        public async Task<CollectionResponse<Story>> GetFullStoriesByTitleTerm(string term, int limit, Guid userId)
        {
            var storyEntities = await _storyRepository.GetStoriesByTitleTerm(term, limit, userId);

            var storyModels = new CollectionResponse<Story>
            {
                Items = storyEntities.Select(_storyMapper.MapToModel).ToList()
            };

            return storyModels;
        }

        public async Task<CollectionResponse<StoryHistory>> GetStoryHistory(Guid storyId)
        {
            var storyHistoryEntities = await _storyHistoryRepository.SearchForMultipleItemsAsync(x => x.StoryId == storyId);

            if (storyHistoryEntities.Count == 0)
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

        public async Task<Story> GetStory(Guid storyId)
        {
            var storyEntity = await _storyRepository.SearchForSingleItemAsync(story => story.Id == storyId);

            if (storyEntity == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntityMessage(nameof(storyId)));
            }
            
            var storyModel = _storyMapper.MapToModel(storyEntity);
            
            return storyModel;
        }

        public async Task<FullStory> GetFullStoryDescription(Guid storyId)
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

        public async Task<Story> AddStory(Story story, Guid userId)
        {
            var storyEntity = _storyMapper.MapToEntity(story);

            var createdStoryEntity = await _storyRepository.CreateAsync(storyEntity);
            await _storyHistoryRepository.CreateAsync(StoryHistoryGenerator.GetStoryHistoryForCreation(userId, createdStoryEntity.Id));
            
            var storyModel = _storyMapper.MapToModel(createdStoryEntity);
            
            return storyModel;
        }

        public async Task<Story> UpdateStory(Story story)
        {
            var storyEntity = _storyMapper.MapToEntity(story);
            storyEntity.CreationDate = DateTime.UtcNow;

            var updatedStoryEntity = await _storyRepository.UpdateItemAsync(storyEntity);

            var storyModel = _storyMapper.MapToModel(updatedStoryEntity);
            
            return storyModel;
        }

        public async Task<Story> UpdateStoryColumn(Story story)
        {
            var storyEntity = _storyMapper.MapToEntity(story);

            await _storyRepository.UpdateStoryColumn(storyEntity);
            var foundStoryEntity =
                await _storyRepository.SearchForSingleItemAsync(x => x.Id == storyEntity.Id);
            
            var updatedStoryModel = _storyMapper.MapToModel(foundStoryEntity);
            
            return updatedStoryModel;
        }

        public async Task ChangeStoryStatus(Story story)
        {
            var storyEntity = _storyMapper.MapToEntity(story);

            await _storyRepository.ChangeStoryStatus(storyEntity);
        }

        public async Task<Story> UpdatePartsOfStory(StoryUpdate storyUpdate, Guid userId)
        {
            var storyHistoryItems = _storyHistoryMapper.MapToStoryEntityParts(storyUpdate, userId);
            var storyEntity = _storyMapper.MapToEntity(storyUpdate.Story);

            await _storyHistoryRepository.CreateAsync(storyHistoryItems);

            var updatedStory = await _storyRepository.UpdateItemAsync(storyEntity);

            var storyModel = _storyMapper.MapToModel(updatedStory);
            
            return storyModel;
        }

        public async Task RemoveStory(Guid id)
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