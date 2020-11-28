using System;
using System.Threading.Tasks;
using WebAPI.Models.Models;
using WebAPI.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IStoryService
    {
        Task<CollectionResponse<Story>> GetStories();
        
        Task<CollectionResponse<Story>> GetStoriesByRange(Guid sprintId, int limit, int offset);

        Task<CollectionResponse<FullStory>> GetFullStoriesByTitleTerm(string term, int limit);

        Task<CollectionResponse<StoryHistory>> GetStoryHistory(Guid storyId);
        
        Task<Story> GetStory(Guid storyId);

        Task<FullStory> GetFullStoryDescription(Guid storyId);

        Task<Story> AddStory(Story story);

        Task<Story> UpdateStory(Story story);

        Task<Story> UpdatePartsOfStory(StoryUpdate storyUpdate);
        
        Task RemoveStory(Guid id);
    }
}