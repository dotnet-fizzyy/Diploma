using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;
using WebAPI.Presentation.Models.Request;
using WebAPI.Presentation.Utilities;

namespace WebAPI.Presentation.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Receive user by access token
        /// </summary>
        /// <response code="200">Receiving user by access token</response>
        /// <response code="401">Failed authentication</response>        
        /// <response code="404">Unable to find user by provided id</response>        
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FullUser>> GetUserByToken()
        {
            var userClaims = ClaimsReader.GetUserClaims(User);
            
            var user = await _userService.GetFullUserAsync(userClaims.UserId);

            return user;
        }
        
        /// <summary>
        /// Receive user by provided id
        /// </summary>
        /// <response code="200">Receiving user by provided id</response>
        /// <response code="401">Failed authentication</response>
        /// <response code="404">Unable to find user by provided id</response>
        [HttpGet]
        [Route("id/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            var user = await _userService.GetUserByIdAsync(id);

            return user;
        }

        /// <summary>
        /// Create user with provided model properties
        /// </summary>
        /// <response code="201">Created user with provided model properties</response>
        /// <response code="401">Failed authentication</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<User>> CreateUser([FromBody]User user)
        {
            var createdUser = await _userService.CreateUserAsync(user);
            
            return CreatedAtAction(nameof(CreateUser), createdUser);
        }

        [HttpPost]
        [Route("team/id/{teamId}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<User>> CreateUserWithTeam([FromBody]User user, Guid teamId)
        {
            var createdUser = await _userService.CreateUserWithTeamAsync(user, teamId);
            
            return CreatedAtAction(nameof(CreateUser), createdUser);
        }

        /// <summary>
        /// Update user with provided model properties
        /// </summary>
        /// <response code="200">Updated user with provided model properties</response>
        /// <response code="401">Failed authentication</response>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<User>> UpdateUser([FromBody] User user)
        {
            var updatedUser = await _userService.UpdateUserAsync(user);
            
            return updatedUser;
        }
        
        /// <summary>
        /// Update user password with provided model properties
        /// </summary>
        /// <response code="204">Updated user password with provided model properties</response>
        /// <response code="401">Failed authentication</response>
        /// <response code="404">Unable to find user with provided id and password</response>
        [HttpPut]
        [Route("password")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateUserPassword([FromBody] PasswordUpdateRequestModel passwordUpdateRequestModel)
        {
            var user = ClaimsReader.GetUserClaims(User);

            await _userService.UpdateUserPasswordAsync(user.UserId, passwordUpdateRequestModel);
            
            return NoContent();
        }
        
        /// <summary>
        /// Change user activity status with provided model properties
        /// </summary>
        /// <response code="204">Changed user activity status with provided model properties</response>
        /// <response code="401">Failed authentication</response>
        /// <response code="404">Unable to find user with provided id</response>
        [HttpPatch]
        [Route("activity")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> ChangeUserActivityStatus([FromBody] JsonPatchDocument<User> userPatchDocument)
        {
            var user = new User();
            userPatchDocument.ApplyTo(user);

            await _userService.ChangeUserActivityStatusAsync(user);
            
            return NoContent();
        }

        /// <summary>
        /// Update user avatar link with provided model properties
        /// </summary>
        /// <response code="204">Updated user avatar link with provided model properties</response>
        /// <response code="401">Failed authentication</response>
        /// <response code="404">Unable to find user with provided id</response>
        [HttpPatch]
        [Route("avatar")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateAvatar([FromBody] JsonPatchDocument<User> userPatchDocument)
        {
            var user = new User();
            userPatchDocument.ApplyTo(user);

            await _userService.UpdateUserAvatarAsync(user);
            
            return NoContent();
        }
        
        /// <summary>
        /// Remove user with provided id
        /// </summary>
        /// <response code="204">Removed user with provided id</response>
        /// <response code="401">Failed authentication</response>
        [HttpDelete]
        [Route("id/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> RemoveUser([BindRequired]Guid id)
        {
            await _userService.RemoveUserAsync(id);

            return NoContent();
        }
    }
}