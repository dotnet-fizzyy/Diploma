using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models.Result;

namespace WebAPI.Presentation.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/dev")]
    public class DevController : ControllerBase
    {
        private readonly IUserService _userService;

        public DevController(IUserService userService)
        {
            _userService = userService;
        }
        
        [HttpGet]
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

        [HttpGet]
        [Route("user/id/{userId}")]
        public async Task<ActionResult<FullUser>> GetFullUserById(Guid userId)
        {
            var fullUser = await _userService.GetFullUser(userId);
            
            return fullUser;
        }
    }
}