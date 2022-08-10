using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Presentation.Models.Pages;
using WebAPI.Presentation.Utilities;

namespace WebAPI.Presentation.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PageController : ControllerBase
    {
        private readonly IPageService _pageService;

        public PageController(IPageService pageService)
        {
            _pageService = pageService;
        }

        [HttpGet("search")]
        public async Task<ActionResult<SearchResult>> GetSearchFieldDataIndex([FromQuery, BindRequired] string term, [FromQuery] Guid[] teamIds) 
            => await _pageService.GetSearchResultsAsync(term, teamIds);

        [HttpGet("default")]
        public async Task<ActionResult<DefaultPage>> GetMainPageData()
        {
            var user = ClaimsReader.GetUserClaims(User);

            var result = await _pageService.GetDefaultPageAsync(user.UserId);

            return result;
        }

        [HttpGet("board")]
        public async Task<ActionResult<BoardPage>> GetBoardPageData(
            [FromQuery, BindRequired]Guid projectId, 
            [FromQuery, BindRequired]Guid teamId,
            [FromQuery]Guid? epicId,
            [FromQuery]Guid? sprintId)
        {
            var user = ClaimsReader.GetUserClaims(User);

            var projectBoardData = await _pageService.GetBoardPageDataAsync(projectId, teamId, epicId, sprintId, user.UserId);
            
            return projectBoardData;
        }

        [HttpGet("project/{projectId}")]
        public async Task<ActionResult<ProjectPage>> GetProjectPageIndex(Guid projectId)
            => await _pageService.GetProjectPageDataAsync(projectId);

        [HttpGet("team/{teamId}")]
        public async Task<ActionResult<TeamPage>> GetTeamPageIndex(Guid teamId)
        {
            var user = ClaimsReader.GetUserClaims(User);
            
            var teamPage = await _pageService.GetTeamPageDataAsync(user.UserId, teamId);
        
            return teamPage;
        }

        [HttpGet("workspace")]
        public async Task<ActionResult<WorkSpacePage>> GetWorkSpacePageIndex()
        {
            var user = ClaimsReader.GetUserClaims(User);

            var userWorkSpace = await _pageService.GetUserWorkSpacePageDataAsync(user.UserId);

            return userWorkSpace;
        }

        [HttpGet("full-stats")]
        public async Task<ActionResult<FullStatisticsPage>> GetStatisticsPageIndex([FromQuery, BindRequired] Guid projectId)
            => await _pageService.GetStatisticsPageDataAsync(projectId);

        [HttpGet("stats")]
        public async Task<ActionResult<StatisticsPage>> GetStatisticsSearch([FromQuery, BindRequired] Guid epicId)
            => await _pageService.GetStatisticsDataForSearchItems(epicId);
    }
}