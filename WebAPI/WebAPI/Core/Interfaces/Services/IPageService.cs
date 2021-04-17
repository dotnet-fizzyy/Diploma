using System;
using System.Threading.Tasks;
using WebAPI.Core.Models;
using WebAPI.Models.Models;
using WebAPI.Models.Models.Pages;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IPageService
    {
        Task<CollectionResponse<StoryHistory>> GetStoryHistoryData(Guid storyId);

        Task<BoardPage> GetBoardPageData(Guid projectId, Guid teamId, Guid userId);
        
        Task<TeamPage> GetTeamPageData(Guid userId, Guid teamId); 
        
        Task<ProjectPage> GetProjectPageData(Guid projectId);

        Task<WorkSpacePage> GetUserWorkSpacePageData(UserClaims user);
    }
}