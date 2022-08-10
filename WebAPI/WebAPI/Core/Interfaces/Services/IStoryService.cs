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
        Task<CollectionResponse<Story>> SearchForStories(
            Guid? epicId,
            Guid? sprintId,
            Guid? teamId,
            string searchField,
            SortDirection? sortDirection);

        Task<CollectionResponse<Story>> SortStories(
            Guid epicId, 
            Guid teamId, 
            Guid? sprintId,
            string sortType,
            SortDirection sortDirection);
        
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