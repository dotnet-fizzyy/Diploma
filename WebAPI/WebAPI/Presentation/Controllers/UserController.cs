using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Core.Interfaces.Utilities;
using WebAPI.Models.Models;
using WebAPI.Models.Models.Authentication;
using WebAPI.Models.Result;
using WebAPI.Presentation.Filters;

namespace WebAPI.Presentation.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/user")]
    [ServiceFilter(typeof(UserAuthorizationFilter))]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IClaimsReader _claimsReader;
        
        public UserController(IUserService userService, IClaimsReader claimsReader)
        {
            _userService = userService;
            _claimsReader = claimsReader;
        }

        /// <summary>
        /// Receive all users projects
        /// </summary>
        /// <response code="200">Receiving all users</response>
        /// <response code="401">Failed authentication</response>
        [HttpGet]
        [Route("all")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<CollectionResponse<User>>> GetAllUsers() => await _userService.GetAllUsers();

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
        public async Task<ActionResult<User>> GetUserByToken()
        {
            var userClaims = _claimsReader.GetUserClaims(User);
            
            var user = await _userService.GetUser(userClaims.UserId);

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
            var user = await _userService.GetUser(id);

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
        public async Task<IActionResult> CreateUser([FromBody]User user)
        {
            var createdUser = await _userService.CreateUser(user);
            
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
            var updatedUser = await _userService.UpdateUser(user);
            
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
        public async Task<IActionResult> UpdateUserPassword([FromBody] PasswordUpdate passwordUpdate)
        {
            var user = _claimsReader.GetUserClaims(User);

            await _userService.UpdateUserPasswordAsync(user.UserId, passwordUpdate);
            
            return NoContent();
        }
        
        /// <summary>
        /// Deactivate user with provided model properties
        /// </summary>
        /// <response code="204">Deactivated user with provided model properties</response>
        /// <response code="401">Failed authentication</response>
        /// <response code="404">Unable to find user with provided id</response>
        [HttpPatch]
        [Route("deactivate")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeactivateUser([FromBody] JsonPatchDocument<User> userPatchDocument)
        {
            var user = new User();
            userPatchDocument.ApplyTo(user);

            await _userService.DeactivateUser(user);
            
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
            await _userService.RemoveUser(id);

            return NoContent();
        }
    }
}