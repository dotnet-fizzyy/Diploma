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
        [Route("workspace")]
        public async Task<ActionResult<WorkSpacePage>> GetWorkSpacePageIndex()
        {
            var user = _claimsReader.GetUserClaims(User);

            var userWorkSpace = await _pageService.GetUserWorkSpacePageData(user);

            return userWorkSpace;
        }
    }
}