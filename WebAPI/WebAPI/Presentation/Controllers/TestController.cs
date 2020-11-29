using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Presentation.Filters;

namespace WebAPI.Presentation.Controllers
{
    [Authorize]
    [ServiceFilter(typeof(UserAuthorizationFilter))]
    public class TestController : ControllerBase
    {
        [HttpGet]
        [Route("test")]
        public ActionResult Test()
        {
            return Ok("test");
        }
    }
}