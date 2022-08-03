using System;
using System.Threading.Tasks;
using WebAPI.Core.Enums;
using WebAPI.Models.Basic;
using WebAPI.Models.Complete;
using WebAPI.Models.Extensions;

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

        Task<StoryComplete> GetCompleteDescriptionAsync(Guid storyId);

        Task<Story> CreateAsync(Story story, string username);

        Task<Story> UpdateColumnAsync(Story story, string username);

        Task<Story> ChangeStatusAsync(Story story,  string username);

        Task<Story> UpdateAsync(Story story, Guid userId);

        Task SoftRemoveAsync(Guid id);
        
        Task RemoveAsync(Guid id);
    }
}