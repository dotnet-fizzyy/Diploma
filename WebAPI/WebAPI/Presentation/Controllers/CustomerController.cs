using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models;

namespace WebAPI.Presentation.Controllers
{
    [ApiController]
    [Route("api/customer")]
    public class CustomerController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITeamService _teamService;

        public CustomerController(IUserService userService, ITeamService teamService)
        {
            _userService = userService;
            _teamService = teamService;
        }
        
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> CreateCustomer([FromBody, BindRequired]AuthenticationUser user)
        {
            var createdCustomer = await _userService.CreateCustomer(user);
            
            return CreatedAtAction(nameof(CreateCustomer), createdCustomer);
        }

        [Authorize]
        [HttpPost]
        [Route("team")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<Team>> CreateTeamWithCustomer([FromBody]Team team)
        {
            var userId = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;
            
            var createdTeam = await _teamService.CreateTeamWithCustomer(team, new Guid(userId!));
            
            return createdTeam;
        }
    }
}