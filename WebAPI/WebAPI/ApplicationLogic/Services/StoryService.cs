using System;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using WebAPI.Core.Enums;
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

        public StoryService(
            IStoryRepository storyRepository, 
            IStoryMapper storyMapper, 
            IStoryHistoryRepository storyHistoryRepository
            )
        {
            _storyRepository = storyRepository;
            _storyMapper = storyMapper;
            _storyHistoryRepository = storyHistoryRepository;
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

        public async Task<Story> AddStory(Story story)
        {
            var storyEntity = _storyMapper.MapToEntity(story);

            var createdStory = await _storyRepository.CreateAsync(storyEntity);

            if (createdStory.UserId != null)
                await _storyHistoryRepository.CreateAsync(
                    GetStoryHistoryForCreation((Guid) createdStory.UserId, createdStory.StoryId)
                );

            var storyModel = _storyMapper.MapToModel(createdStory);
            
            return storyModel;
        }

        public Task<Story> UpdateStory(Story story)
        {
            throw new NotImplementedException();
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

        
        private static Core.Entities.StoryHistory GetStoryHistoryForCreation(Guid userId, Guid storyId)
        {
            return new Core.Entities.StoryHistory
            {
                StoryHistoryId = new Guid(),
                StoryHistoryAction = StoryHistoryAction.Add,
                UserId = userId,
                CurrentValue = string.Empty,
                PreviousValue = string.Empty,
                FieldName = string.Empty,
                StoryId = storyId,
            };
        }
    }
}