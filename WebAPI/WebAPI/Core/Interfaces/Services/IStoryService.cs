using System;
using System.Threading.Tasks;
using WebAPI.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IStoryService
    {
        Task<CollectionResponse<Story>> GetStoriesAsync();
        
        Task<CollectionResponse<Story>> GetStoriesByRangeAsync(Guid sprintId, int limit, int offset);

        Task<CollectionResponse<Story>> GetFullStoriesByTitleTermAsync(string term, int limit, Guid projectId);

        Task<CollectionResponse<StoryHistory>> GetStoryHistoryAsync(Guid storyId);
        
        Task<Story> GetStoryByIdAsync(Guid storyId);

        Task<FullStory> GetFullStoryDescriptionAsync(Guid storyId);

        Task<Story> CreateStoryAsync(Story story, Guid userId);

        Task<Story> UpdateStoryAsync(Story story);

        Task<Story> UpdateStoryColumnAsync(Story story);

        Task<Story> ChangeStoryStatusAsync(Story story);

        Task<Story> UpdatePartsOfStoryAsync(StoryUpdate storyUpdate, Guid userId);

        Task RemoveStorySoftAsync(Guid id);
        
        Task RemoveStoryAsync(Guid id);
    }
}