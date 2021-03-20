using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models;
using WebAPI.Models.Result;

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

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<AuthenticationResponse>> AuthenticateUser([FromBody, BindRequired] AuthenticationUser user)
        {
            var authResult = await _tokenService.AuthenticateUser(user);

            if (authResult == null)
            {
                return BadRequest();
            }

            return authResult;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<User>> CreateCustomer([FromBody, BindRequired] AuthenticationUser user)
        {
            var createdCustomer = await _userService.CreateCustomer(user);
            
            return CreatedAtAction(nameof(CreateCustomer), createdCustomer);
        }
    }
}