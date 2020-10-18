using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Presentation.Controllers
{
    public class TestController : ControllerBase
    {
        [HttpGet]
        [Route("test")]
        public ActionResult Test()
        {
            return Ok("works");
        }
    }
}