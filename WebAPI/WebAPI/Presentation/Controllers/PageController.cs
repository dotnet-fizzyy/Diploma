using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models;
using WebAPI.Models.Result;
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
        [Route("main")]
        public IActionResult GetMainPageData()
        {
            return Ok();
        }
        
        [HttpGet]
        [Route("board")]
        public IActionResult GetBoardPageData()
        {
            return Ok();
        }
        
        [HttpGet]
        [Route("story-history")]
        public IActionResult GetStoryHistoryPageData()
        {
            return Ok();
        }
        
        /// <summary>
        /// Receive projects belong to user for projects page
        /// </summary>
        /// <response code="200">Received projects belong to user for projects page</response>
        /// <response code="400">Unable to receive user id and role</response>
        /// <response code="401">Failed authentication</response>
        [HttpGet]
        [Route("projects")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<CollectionResponse<Project>>> GetUserProjectsDataIndex()
        {
            var user = _claimsReader.GetUserClaims(User);

            var userProjects = await _pageService.GetUserProjects(user);
            
            return userProjects;
        }
    }
}