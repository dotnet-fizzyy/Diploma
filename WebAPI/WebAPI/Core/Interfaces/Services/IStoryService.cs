using System;
using System.Threading.Tasks;
using WebAPI.Core.Enums;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IStoryService
    {
        Task<CollectionResponse<Story>> GetStoriesFromSprintAsync(Guid sprintId);
        
        Task<CollectionResponse<Story>> GetStoriesFromEpicAsync(Guid epicId);

        Task<CollectionResponse<Story>> SortStories(Guid epicId, Guid? sprintId, string sortType, OrderType orderType);
        
        Task<Story> GetStoryByIdAsync(Guid storyId);

        Task<FullStory> GetFullStoryDescriptionAsync(Guid storyId);

        Task<Story> CreateStoryAsync(Story story, string userName);

        Task<Story> UpdateStoryAsync(Story story);

        Task<Story> UpdateStoryColumnAsync(Story story, string userName);

        Task<Story> ChangeStoryStatusAsync(Story story,  string userName);

        Task<Story> UpdatePartsOfStoryAsync(Story story, string userName);

        Task RemoveStorySoftAsync(Guid id);
        
        Task RemoveStoryAsync(Guid id);
    }
}