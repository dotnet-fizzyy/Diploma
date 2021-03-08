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
using WebAPI.Models.Result;
using WebAPI.Presentation.Filters;

namespace WebAPI.Presentation.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/team")]
    [ServiceFilter(typeof(UserAuthorizationFilter))]
    public class TeamController : ControllerBase
    {
        private readonly ITeamService _teamService;

        public TeamController(ITeamService teamService)
        {
            _teamService = teamService;
        }

        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<CollectionResponse<Team>>> GetAllTeams() => await _teamService.GetAllTeams();

        [HttpGet]
        [Route("user")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<CollectionResponse<FullTeam>>> GetUserTeams()
        {
            var userId = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;
            
            var userTeams = await _teamService.GetUserTeams(new Guid(userId!));

            return userTeams;
        }
        
        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Team>> GetTeam(Guid id)
        {
           var team = await _teamService.GetTeam(id);

           if (team == null)
           {
               return NotFound();
           }
           
           return team;
        }

        [HttpGet]
        [Route("full/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FullTeam>> GetFullTeamDescription(Guid id)
        {
            var fullTeam = await _teamService.GetFullTeamDescription(id);

            if (fullTeam == null)
            {
                return NotFound();
            }
            
            return fullTeam;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Team>> CreateTeam([FromBody, BindRequired]Team team)
        {
            var createdTeam = await _teamService.CreateTeam(team);
            
            return CreatedAtAction(nameof(CreateTeam), createdTeam);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> UpdateTeam([FromBody, BindRequired] Team team)
        {
            var updatedTeam = await _teamService.UpdateTeam(team);
            
            return Ok(updatedTeam);
        }

        [HttpDelete]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> RemoveTeam(Guid id)
        {
            await _teamService.RemoveTeam(id);
            
            return NoContent();
        }
    }
}