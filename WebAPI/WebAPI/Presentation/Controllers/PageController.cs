using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Presentation.Filters;

namespace WebAPI.Presentation.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/page")]
    [ServiceFilter(typeof(UserAuthorizationFilter))]
    public class PageController : ControllerBase
    {
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
    }
}