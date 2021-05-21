using System;
using System.Threading.Tasks;
using WebAPI.Presentation.Models.Pages;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IPageService
    {
        Task<SearchResult> GetSearchResultsAsync(string searchTerm, Guid[] teamIds);

        Task<BoardPage> GetBoardPageDataAsync(Guid projectId, Guid teamId, Guid userId);
        
        Task<TeamPage> GetTeamPageDataAsync(Guid userId, Guid teamId); 
        
        Task<ProjectPage> GetProjectPageDataAsync(Guid projectId);

        Task<WorkSpacePage> GetUserWorkSpacePageDataAsync(Guid userId);

        Task<FullStatisticsPage> GetStatisticsPageDataAsync(Guid projectId);

        Task<StatisticsPage> GetStatisticsDataForSearchItems(Guid epicId);
    }
}