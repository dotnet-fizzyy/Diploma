using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.ApplicationLogic.Utilities;

namespace WebAPI.Presentation.Controllers
{
    [Authorize]
    public class DevController : ControllerBase
    {
        [HttpGet]
        [Route("dev")]
        public ActionResult Test()
        {
            return Ok("test");
        }

        [HttpGet]
        [Route("hash")]
        public IActionResult GetHash([FromQuery] string value)
        {
            var hash = PasswordHashing.CreateHashPassword(value);
            
            return Ok(hash);
        }
    }
}