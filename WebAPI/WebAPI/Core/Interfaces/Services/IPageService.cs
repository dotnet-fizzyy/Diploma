using System;
using System.Threading.Tasks;
using WebAPI.Core.Models;
using WebAPI.Models.Models.Pages;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IPageService
    {
        Task<SearchResult> GetSearchResultsAsync(string term, Guid workSpaceId);

        Task<BoardPage> GetBoardPageDataAsync(Guid projectId, Guid teamId, Guid userId);
        
        Task<TeamPage> GetTeamPageDataAsync(Guid userId, Guid teamId); 
        
        Task<ProjectPage> GetProjectPageDataAsync(Guid projectId);

        Task<WorkSpacePage> GetUserWorkSpacePageDataAsync(UserClaims user);
    }
}