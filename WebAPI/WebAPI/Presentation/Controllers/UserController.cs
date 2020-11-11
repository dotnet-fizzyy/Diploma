using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models;
using WebAPI.Models.Result;

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

        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<CollectionResponse<User>>> GetAllUsers() => await _userService.GetAllUsers();

        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            var user = await _userService.GetUser(id);

            if (user == null)
            {
                return NotFound();
            }
            
            return user;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody]User user)
        {
            var createdUser = await _userService.CreateUser(user);
            
            return CreatedAtAction(nameof(CreateUser), createdUser);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromBody] User user)
        {
            var updatedUser = await _userService.UpdateUser(user);
            
            return Ok(updatedUser);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> RemoveUser(Guid id)
        {
            await _userService.RemoveUser(id);

            return NoContent();
        }
    }
}