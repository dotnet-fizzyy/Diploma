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
        
        [HttpGet]
        [Route("projects")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CollectionResponse<Project>>> GetUserProjectsDataIndex()
        {
            var user = _claimsReader.GetUserClaims(User);

            var userProjects = await _pageService.GetUserProjects(user);
            
            return userProjects;
        }
    }
}