using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Core.Interfaces.Utilities;
using WebAPI.Presentation.Models.Pages;

namespace WebAPI.Presentation.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/page")]
    public class PageController : ControllerBase
    {
        private readonly IPageService _pageService;
        private readonly IClaimsReader _claimsReader;

        public PageController(IPageService pageService, IClaimsReader claimsReader)
        {
            _pageService = pageService;
            _claimsReader = claimsReader;
        }

        [HttpGet]
        [Route("search")]
        public async Task<ActionResult<SearchResult>> GetSearchFieldDataIndex([FromQuery, BindRequired]string term, [FromQuery, BindRequired]Guid workSpaceId)
            => await _pageService.GetSearchResultsAsync(term, workSpaceId);

        [HttpGet]
        [Route("main")]
        public IActionResult GetMainPageData()
        {
            return Ok();
        }

        [HttpGet]
        [Route("board")]
        public async Task<ActionResult<BoardPage>> GetBoardPageData([FromQuery, BindRequired]Guid projectId, [FromQuery, BindRequired]Guid teamId)
        {
            var user = _claimsReader.GetUserClaims(User);

            var projectBoardData = await _pageService.GetBoardPageDataAsync(projectId, teamId, user.UserId);
            
            return projectBoardData;
        }

        [HttpGet]
        [Route("project/{projectId}")]
        public async Task<ActionResult<ProjectPage>> GetProjectPageIndex(Guid projectId)
            => await _pageService.GetProjectPageDataAsync(projectId);

        [HttpGet]
        [Route("team/{teamId}")]
        public async Task<ActionResult<TeamPage>> GetTeamPageIndex(Guid teamId)
        {
            var user = _claimsReader.GetUserClaims(User);
            
            var teamPage = await _pageService.GetTeamPageDataAsync(user.UserId, teamId);
        
            return teamPage;
        }

        [HttpGet]
        [Route("workspace")]
        public async Task<ActionResult<WorkSpacePage>> GetWorkSpacePageIndex()
        {
            var user = _claimsReader.GetUserClaims(User);

            var userWorkSpace = await _pageService.GetUserWorkSpacePageDataAsync(user.UserId);

            return userWorkSpace;
        }

        [HttpGet]
        [Route("stats")]
        public async Task<ActionResult<StatisticsPage>> GetStatsPageIndex([FromQuery, BindRequired] Guid projectId)
            => await _pageService.GetStatisticsPageDataAsync(projectId);
    }
}