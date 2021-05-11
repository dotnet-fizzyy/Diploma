using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Core.Interfaces.Utilities;
using WebAPI.Models.Models.Authentication;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;
using WebAPI.Presentation.Constants;

namespace WebAPI.Presentation.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthenticationController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly IUserService _userService;
        private readonly IClaimsReader _claimsReader;

        public AuthenticationController(ITokenService tokenService, IUserService userService, IClaimsReader claimsReader)
        {
            _tokenService = tokenService;
            _userService = userService;
            _claimsReader = claimsReader;
        }

        /// <summary>
        /// Authenticate user (sign in)
        /// </summary>
        /// <param name="user">AuthenticationUser model</param>
        /// <response code="200">Successful authentication</response>
        /// <response code="400">Failed authentication</response>
        [HttpPost]
        [Route("sign-in")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<AuthenticationUserResultModel>> AuthenticateUser([FromBody, BindRequired] SignInUser user)
        {
            var authResult = await _tokenService.AuthenticateUser(user);

            return authResult;
        }

        /// <summary>
        /// Create customer (sign up)
        /// </summary>
        /// <param name="user">AuthenticationUser model</param>
        /// <response code="201">Successful customer registration</response>
        [HttpPost]
        [Route("sign-up")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<User>> CreateCustomer([FromBody, BindRequired] SignUpUser user)
        {
            var createdCustomer = await _userService.CreateCustomerAsync(user);
            
            return CreatedAtAction(nameof(CreateCustomer), createdCustomer);
        }

        [HttpGet]
        [Route("token-renew")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<AuthenticationResultModel>> UpdateAccessToken([FromHeader(Name = RequestHeaders.RefreshTokenHeader)] string refreshToken)
        {
            var user = _claimsReader.GetUserClaims(User);
            
            var authModel = await _tokenService.UpdateTokens(refreshToken, user.UserId, user.UserName, user.UserRole.ToString());
            
            return Ok(authModel);
        }
    }
}