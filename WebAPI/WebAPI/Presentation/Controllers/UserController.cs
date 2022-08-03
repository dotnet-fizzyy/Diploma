using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Basic;
using WebAPI.Models.Models.Result;
using WebAPI.Presentation.Models.Request;
using WebAPI.Presentation.Utilities;

namespace WebAPI.Presentation.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Gets user by access token.
        /// </summary>
        /// <response code="200">Gets user.</response>
        /// <response code="401">Failed authentication.</response>
        /// <response code="404">Unable to find user by provided id.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FullUser>> GetUserByToken()
        {
            var userClaims = ClaimsReader.GetUserClaims(User);
            
            return await _userService.GetFullDescriptionByIdAsync(userClaims.UserId);
        }
        
        /// <summary>
        /// Gets user by provided id.
        /// </summary>
        /// <param name="id">User identifier.</param>
        /// <response code="200">Gets user by provided id.</response>
        /// <response code="401">Failed authentication.</response>
        /// <response code="404">Unable to find user by provided id.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpGet("id/{id:guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<User>> GetUser(Guid id) =>
            await _userService.GetByIdAsync(id);

        /// <summary>
        /// Creates user.
        /// </summary>
        /// <param name="user"><see cref="User"/> model.</param>
        /// <response code="201">Created user.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<User>> CreateUser([FromBody] User user)
        {
            var createdUser = await _userService.CreateAsync(user);
            
            return CreatedAtAction(nameof(CreateUser), createdUser);
        }

        /// <summary>
        /// Creates user and assigns him to team.
        /// </summary>
        /// <param name="user">User identifier.</param>
        /// <param name="teamId">Team identifier.</param>
        /// <response code="201">Created user.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpPost("team/id/{teamId:guid}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<User>> CreateUserAndAssignToTeam([FromBody] User user, Guid teamId)
        {
            var createdUser = await _userService.CreateUserAndAssignToTeamAsync(user, teamId);
            
            return CreatedAtAction(nameof(CreateUser), createdUser);
        }

        /// <summary>
        /// Updates user (except password).
        /// </summary>
        /// <response code="200">Updated user.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<User>> UpdateUser([FromBody] User user) =>
            await _userService.UpdateAsync(user);

        /// <summary>
        /// Updates user password.
        /// </summary>
        /// <param name="passwordUpdateModel"><see cref="PasswordUpdateRequestModel"/> model.</param>
        /// <response code="204">Updated user password.</response>
        /// <response code="401">Failed authentication.</response>
        /// <response code="404">Unable to find user with provided id and password.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpPut("password")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> UpdateUserPassword(
            [FromBody] PasswordUpdateRequestModel passwordUpdateModel)
        {
            var user = ClaimsReader.GetUserClaims(User);

            await _userService.UpdatePasswordAsync(user.UserId, passwordUpdateModel);
            
            return NoContent();
        }
        
        /// <summary>
        /// Updates user activity status.
        /// </summary>
        /// <param name="userPatch"><see cref="JsonPatchDocument"/> with <see cref="User"/>.</param>
        /// <response code="204">Updates user activity status.</response>
        /// <response code="401">Failed authentication.</response>
        /// <response code="404">Unable to find user with provided id.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpPatch("activity")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> ChangeUserActivityStatus([FromBody] JsonPatchDocument<User> userPatch)
        {
            var user = new User();
            userPatch.ApplyTo(user);

            await _userService.ChangeActivityStatusAsync(user);
            
            return NoContent();
        }

        /// <summary>
        /// Updates user avatar link.
        /// </summary>
        /// <param name="userPatch"><see cref="JsonPatchDocument"/> with <see cref="User"/>.</param>
        /// <response code="204">Updated user avatar link.</response>
        /// <response code="401">Failed authentication.</response>
        /// <response code="404">Unable to find user with provided id.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpPatch("avatar")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> UpdateAvatar([FromBody] JsonPatchDocument<User> userPatch)
        {
            var user = new User();
            userPatch.ApplyTo(user);

            await _userService.UpdateAvatarAsync(user);
            
            return NoContent();
        }
        
        /// <summary>
        /// Removes team from DB by provided id.
        /// </summary>
        /// <param name="id">User identifier.</param>
        /// <response code="204">User was removed from DB.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpDelete("id/{id:guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult> RemoveUser(Guid id)
        {
            await _userService.RemoveAsync(id);

            return NoContent();
        }
    }
}