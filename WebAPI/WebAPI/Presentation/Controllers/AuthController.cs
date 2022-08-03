using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Basic;
using WebAPI.Presentation.Constants;
using WebAPI.Presentation.Models.Request;
using WebAPI.Presentation.Models.Response;
using WebAPI.Presentation.Utilities;

namespace WebAPI.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly IUserService _userService;

        public AuthController(ITokenService tokenService, IUserService userService)
        {
            _tokenService = tokenService;
            _userService = userService;
        }

        /// <summary>
        /// Authenticates user (sign in).
        /// </summary>
        /// <param name="userRequestModel"><see cref="SignInUserRequestModel"/> model.</param>
        /// <response code="200">Successful authentication.</response>
        /// <response code="400">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpPost("sign-in")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<AuthenticationUserResponseModel>> AuthenticateUser(
            [FromBody, BindRequired] SignInUserRequestModel userRequestModel) => 
                await _userService.AuthenticateUserAsync(userRequestModel);

        /// <summary>
        /// Creates user (sign up).
        /// </summary>
        /// <param name="userRequestModel"><see cref="SignUpUserRequestModel"/> model.</param>
        /// <response code="201">Successful user registration.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpPost("sign-up")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<User>> CreateCustomer(
            [FromBody, BindRequired] SignUpUserRequestModel userRequestModel)
        {
            var createdCustomer = await _userService.RegisterUserAsync(userRequestModel);
            
            return CreatedAtAction(nameof(CreateCustomer), createdCustomer);
        }
        
        /// <summary>
        /// Updates user access token (and refresh in case of server configuration).
        /// </summary>
        /// <response code="200">Successful user access token update.</response>
        /// <response code="400">Invalid data provided to request.</response>
        /// <response code="404">Unable to find user to update token pair.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpGet("token-renew")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<AuthenticationResponseModel>> UpdateAccessToken(
            [FromHeader(Name = RequestHeaders.RefreshTokenHeader)] string refreshToken)
        {
            var user = ClaimsReader.GetUserClaims(User);
            
            return await _tokenService.UpdateTokens(
                refreshToken,
                user.UserId,
                user.UserName,
                user.UserRole.ToString());
        }

        /// <summary>
        /// Checks for user with email existence.
        /// </summary>
        /// <param name="email">User email address.</param>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpGet("check-email")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<EmailResponseModel>> CheckForEmailExistence(
            [FromQuery, BindRequired] string email) =>
            await _userService.CheckEmailExistenceAsync(email);
    }
}