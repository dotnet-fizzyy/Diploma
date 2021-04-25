using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models;
using WebAPI.Models.Models.Authentication;
using WebAPI.Models.Models.Result;

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
        /// <param name="user">AuthenticationUser model</param>
        /// <response code="200">Successful authentication</response>
        /// <response code="400">Failed authentication</response>
        [HttpPost]
        [Route("sign-in")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<AuthenticationResponse>> AuthenticateUser([FromBody, BindRequired] SignInUser user)
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
    }
}