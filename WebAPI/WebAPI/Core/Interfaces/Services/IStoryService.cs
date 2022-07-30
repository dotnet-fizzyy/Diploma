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
        
        Task<CollectionResponse<Story>> GetStoriesFromEpicAssignedToTeamAsync(Guid epicId, Guid teamId);

        Task<CollectionResponse<Story>> SortStories(
            Guid epicId, 
            Guid teamId, 
            Guid? sprintId,
            string sortType,
            OrderType orderType);
        
        Task<Story> GetByIdAsync(Guid storyId);

        Task<FullStory> GetFullDescriptionAsync(Guid storyId);

        Task<Story> CreateAsync(Story story, string username);

        Task<Story> UpdateColumnAsync(Story story, string username);

        Task<Story> ChangeStatusAsync(Story story,  string username);

        Task<Story> UpdateAsync(Story story, Guid userId);

        Task SoftRemoveAsync(Story story);
        
        Task RemoveAsync(Guid id);
    }
}