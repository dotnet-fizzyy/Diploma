using System;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using WebAPI.Core.Enums;
using WebAPI.Core.Interfaces.Aggregators;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models;
using WebAPI.Models.Result;

namespace WebAPI.ApplicationLogic.Services
{
    public class StoryService : IStoryService
    {
        private readonly IStoryRepository _storyRepository;
        private readonly IStoryMapper _storyMapper;
        private readonly IStoryHistoryRepository _storyHistoryRepository;
        private readonly IStoryHistoryMapper _storyHistoryMapper;
        private readonly IStoryAggregator _storyAggregator;

        public StoryService(
            IStoryRepository storyRepository, 
            IStoryMapper storyMapper, 
            IStoryHistoryRepository storyHistoryRepository,
            IStoryHistoryMapper storyHistoryMapper,
            IStoryAggregator storyAggregator
        )
        {
            _storyRepository = storyRepository;
            _storyMapper = storyMapper;
            _storyHistoryRepository = storyHistoryRepository;
            _storyHistoryMapper = storyHistoryMapper;
            _storyAggregator = storyAggregator;
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
                    x => x.StoryId,
                    OrderType.Asc
                    );

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
            var storyHistoryEntities =
                await _storyHistoryRepository.SearchForMultipleItemsAsync(x => x.StoryId == storyId);

            if (storyHistoryEntities.Count == 0)
            {
                return new CollectionResponse<StoryHistory>();
            }
            
            var collectionResponse = new CollectionResponse<StoryHistory>
            {
                Items = storyHistoryEntities.Select(_storyHistoryMapper.MapToModel).ToList(),
            };

            return collectionResponse;
        }

        public async Task<Story> GetStory(Guid storyId)
        {
            var storyEntity =
                await _storyRepository.SearchForSingleItemAsync(story => story.StoryId == storyId);

            var storyModel = _storyMapper.MapToModel(storyEntity);
            
            return storyModel;
        }

        public async Task<FullStory> GetFullStoryDescription(Guid storyId)
        {
            var storyEntity =
                await _storyRepository.SearchForSingleItemAsync(
                    story => story.StoryId == storyId,
                include => include.StoryHistories
                    );

            var storyFullModel = _storyMapper.MapToFullModel(storyEntity);

            return storyFullModel;
        }

        public async Task<Story> AddStory(Story story, Guid userId)
        {
            var storyEntity = _storyMapper.MapToEntity(story);

            var createdStoryEntity = await _storyRepository.CreateAsync(storyEntity);
            await _storyHistoryRepository.CreateAsync(
                StoryHistoryGenerator.GetStoryHistoryForCreation(userId, createdStoryEntity.StoryId)
                );
            
            var storyModel = _storyMapper.MapToModel(createdStoryEntity);
            
            return storyModel;
        }

        public async Task<Story> UpdateStory(Story story)
        {
            var storyEntity = _storyMapper.MapToEntity(story);

            var updatedStoryEntity = await _storyRepository.UpdateItemAsync(storyEntity);
            await _storyHistoryRepository.CreateAsync(
                StoryHistoryGenerator.GetStoryHistoryForCreation(Guid.Empty, updatedStoryEntity.StoryId)
            );
            
            var storyModel = _storyMapper.MapToModel(updatedStoryEntity);
            
            return storyModel;
        }

        public async Task UpdateStoryColumn(Story story)
        {
            var storyEntity = _storyMapper.MapToEntity(story);

            await _storyRepository.UpdateStoryColumn(storyEntity);
        }

        public async Task ChangeStoryStatus(Story story)
        {
            var storyEntity = _storyMapper.MapToEntity(story);

            await _storyRepository.ChangeStoryStatus(storyEntity);
        }

        public async Task<Story> UpdatePartsOfStory(StoryUpdate storyUpdate)
        {
            var storyHistoryItems = _storyHistoryMapper.MapToStoryEntityParts(storyUpdate);

            await _storyHistoryRepository.CreateAsync(storyHistoryItems);

            var storyEntity = _storyAggregator.CreateStoryFromUpdateParts(storyUpdate);

            var updatedStory = await _storyRepository.CreateAsync(storyEntity);

            var storyModel = _storyMapper.MapToModel(updatedStory);
            
            return storyModel;
        }

        public async Task RemoveStory(Guid id)
        {
            using (var scope = new TransactionScope
                (
                    TransactionScopeOption.Required,
                    new TransactionOptions
                    {
                        IsolationLevel = IsolationLevel.Serializable,
                    },
                    TransactionScopeAsyncFlowOption.Enabled
                )
            )
            {
                await _storyHistoryRepository.DeleteAsync(x => x.StoryId == id);
                await _storyRepository.DeleteAsync(x => x.StoryId == id);

                scope.Complete();
            }
        }
    }
}