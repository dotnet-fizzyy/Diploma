using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models;

namespace WebAPI.Presentation.Controllers
{
    [ApiController]
    [Route("customer")]
    public class CustomerController : ControllerBase
    {
        private readonly IUserService _userService;

        public CustomerController(IUserService userService)
        {
            _userService = userService;
        }
        
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateCustomer([FromBody]AuthenticationUser user)
        {
            var createdCustomer = await _userService.CreateCustomer(user);
            
            return CreatedAtAction(nameof(CreateCustomer), createdCustomer);
        }
    }
}