using System.Threading.Tasks;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Core.Interfaces.Services;

namespace WebAPI.ApplicationLogic.Services
{
    public class StoryService : IStoryService
    {
        private readonly IStoryRepository _storyRepository;
        private readonly IStoryMapper _storyMapper;

        public StoryService(IStoryRepository storyRepository, IStoryMapper storyMapper)
        {
            _storyRepository = storyRepository;
            _storyMapper = storyMapper;
        }

        public async Task<Story> AddStory(WebAPI.Models.Models.Story story)
        {
            var entityStory = _storyMapper.MapToEntity(story);

            await _storyRepository.CreateAsync(entityStory);
            
            return entityStory;
        }
    }
}