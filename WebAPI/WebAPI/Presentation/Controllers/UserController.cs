using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models;

namespace WebAPI.Presentation.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        
        [AllowAnonymous]
        [HttpPost]
        [Route("log-in")]
        public async Task<IActionResult> AuthenticateUser(AuthenticationUser authUser)
        {
            return Ok();
        }
        
        [HttpGet]
        [Route("{userId}")]
        public async Task<IActionResult> GetUser(Guid userId)
        {
            return Ok(userId);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody]User user)
        {
            return NoContent();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromBody] User user)
        {
            return Ok();
        }
    }
}