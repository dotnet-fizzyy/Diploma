using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Core.Interfaces.Utilities;
using WebAPI.Models.Models;
using WebAPI.Models.Models.Pages;
using WebAPI.Models.Models.Result;
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
        [Route("board/project/id/{projectId}/team/id/{teamId}")]
        public async Task<ActionResult<BoardPage>> GetBoardPageData(Guid projectId, Guid teamId)
        {
            var user = _claimsReader.GetUserClaims(User);

            var projectBoardData = await _pageService.GetBoardPageData(projectId, teamId, user.UserId);
            
            return projectBoardData;
        }
        
        [HttpGet]
        [Route("story-history/story/id/{storyId}")]
        public async Task<ActionResult<CollectionResponse<StoryHistory>>> GetStoryHistoryPageIndex(Guid storyId)
        {
            var storyHistory = await _pageService.GetStoryHistoryData(storyId);
            
            return storyHistory;
        }
        
        [HttpGet]
        [Route("project/{projectId}")]
        public async Task<ActionResult<ProjectPage>> GetProjectPageIndex(Guid projectId)
        {
            var userProject = await _pageService.GetProjectPageData(projectId);
            
            return userProject;
        }
        
        [HttpGet]
        [Route("team/{teamId}")]
        public async Task<ActionResult<TeamPage>> GetTeamPageIndex(Guid teamId)
        {
            var user = _claimsReader.GetUserClaims(User);
            
            var teamPage = await _pageService.GetTeamPageData(user.UserId, teamId);
        
            return teamPage;
        }

        [HttpGet]
        [Route("workspace")]
        public async Task<ActionResult<WorkSpacePage>> GetWorkSpacePageIndex()
        {
            var user = _claimsReader.GetUserClaims(User);

            var userWorkSpace = await _pageService.GetUserWorkSpacePageData(user);

            return userWorkSpace;
        }
    }
}