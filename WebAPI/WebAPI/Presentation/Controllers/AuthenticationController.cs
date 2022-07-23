using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models.Models;
using WebAPI.Presentation.Constants;
using WebAPI.Presentation.Models.Request;
using WebAPI.Presentation.Models.Response;
using WebAPI.Presentation.Utilities;

namespace WebAPI.Presentation.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthenticationController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly IUserService _userService;

        public AuthenticationController(ITokenService tokenService, IUserService userService)
        {
            _tokenService = tokenService;
            _userService = userService;
        }

        /// <summary>
        /// Authenticate user (sign in)
        /// </summary>
        /// <param name="userRequestModel">AuthenticationUser model</param>
        /// <response code="200">Successful authentication</response>
        /// <response code="400">Failed authentication</response>
        [HttpPost]
        [Route("sign-in")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<AuthenticationUserResponseModel>> AuthenticateUser([FromBody, BindRequired] SignInUserRequestModel userRequestModel)
        {
            var authResult = await _userService.AuthenticateUser(userRequestModel);

            return authResult;
        }

        /// <summary>
        /// Create customer (sign up)
        /// </summary>
        /// <param name="userRequestModel">AuthenticationUser model</param>
        /// <response code="201">Successful customer registration</response>
        [HttpPost]
        [Route("sign-up")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<User>> CreateCustomer([FromBody, BindRequired] SignUpUserRequestModel userRequestModel)
        {
            var createdCustomer = await _userService.CreateCustomerAsync(userRequestModel);
            
            return CreatedAtAction(nameof(CreateCustomer), createdCustomer);
        }
        
        /// <summary>
        /// Update user access token (sign up)
        /// </summary>
        /// <response code="200">Successful user access token update</response>
        [HttpGet]
        [Route("token-renew")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<AuthenticationResponseModel>> UpdateAccessToken([FromHeader(Name = RequestHeaders.RefreshTokenHeader)] string refreshToken)
        {
            var user = ClaimsReader.GetUserClaims(User);
            
            var authModel = await _tokenService.UpdateTokens(refreshToken, user.UserId, user.UserName, user.UserRole.ToString());
            
            return authModel;
        }

        [HttpGet]
        [Route("check-email")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<EmailResponseModel>> CheckForEmailExistence([FromQuery] string email)
            => await _userService.CheckEmailExistenceAsync(email);
    }
}