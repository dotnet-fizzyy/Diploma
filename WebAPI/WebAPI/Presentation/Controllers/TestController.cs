using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Core.Configuration;

namespace WebAPI.Presentation.Controllers
{
    public class TestController : ControllerBase
    {
        private readonly AppSettings _appSettings;

        public TestController(AppSettings appSettings)
        {
            _appSettings = appSettings;
        }
        
        [HttpGet]
        [Authorize]
        [Route("test")]
        public ActionResult Test()
        {
            return Ok(_appSettings.Database.Password);
        }
    }
}