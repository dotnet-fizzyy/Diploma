using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Core.Interfaces.Utilities;
using WebAPI.Models.Models.Pages;
using WebAPI.Presentation.Filters;

namespace WebAPI.Presentation.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/page")]
    [ServiceFilter(typeof(UserAuthorizationFilter))]
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
        public async Task<ActionResult<SearchResult>> GetSearchFieldDataIndex([FromQuery]string term, [FromQuery]Guid workSpaceId)
        {
            var searchResult = await _pageService.GetSearchResultsAsync(term, workSpaceId);
            
            return searchResult;
        }
        
        [HttpGet]
        [Route("main")]
        public IActionResult GetMainPageData()
        {
            return Ok();
        }

        [HttpGet]
        [Route("board")]
        public async Task<ActionResult<BoardPage>> GetBoardPageData([FromQuery]Guid projectId, [FromQuery]Guid teamId)
        {
            var user = _claimsReader.GetUserClaims(User);

            var projectBoardData = await _pageService.GetBoardPageDataAsync(projectId, teamId, user.UserId);
            
            return projectBoardData;
        }

        [HttpGet]
        [Route("project/{projectId}")]
        public async Task<ActionResult<ProjectPage>> GetProjectPageIndex(Guid projectId)
        {
            var userProject = await _pageService.GetProjectPageDataAsync(projectId);
            
            return userProject;
        }
        
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

            var userWorkSpace = await _pageService.GetUserWorkSpacePageDataAsync(user);

            return userWorkSpace;
        }
    }
}