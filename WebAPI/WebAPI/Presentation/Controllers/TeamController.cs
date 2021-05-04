using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Core.Interfaces.Utilities;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;
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
        private readonly IClaimsReader _claimsReader;

        public TeamController(ITeamService teamService, IClaimsReader claimsReader)
        {
            _teamService = teamService;
            _claimsReader = claimsReader;
        }

        /// <summary>
        /// Receive all teams
        /// </summary>
        /// <response code="200">Receiving all teams</response>
        /// <response code="401">Failed authentication</response>
        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<CollectionResponse<Team>>> GetAllTeams() => await _teamService.GetAllTeamsAsync();

        /// <summary>
        /// Receive all teams that belong to user
        /// </summary>
        /// <response code="200">Receiving all teams that belong to user</response>
        /// <response code="401">Failed authentication</response>
        [HttpGet]
        [Route("user")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<CollectionResponse<FullTeam>>> GetUserTeams()
        {
            var user = _claimsReader.GetUserClaims(User);
            
            var userTeams = await _teamService.GetUserTeamsAsync(user.UserId);

            return userTeams;
        }
        
        /// <summary>
        /// Receive team by provided id
        /// </summary>
        /// <response code="200">Receiving team by provided id</response>
        /// <response code="401">Failed authentication</response>
        /// <response code="404">Unable to find team by provided id</response>
        [HttpGet]
        [Route("id/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Team>> GetTeam(Guid id)
        {
           var team = await _teamService.GetTeamByIdAsync(id);

           return team;
        }

        /// <summary>
        /// Receive full team description by provided id
        /// </summary>
        /// <response code="200">Receiving full team description by provided id</response>
        /// <response code="401">Failed authentication</response>
        /// <response code="404">Unable to find project by provided id</response>
        [HttpGet]
        [Route("full/id/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FullTeam>> GetFullTeamDescription(Guid id)
        {
            var fullTeam = await _teamService.GetFullTeamDescriptionAsync(id);

            return fullTeam;
        }

        /// <summary>
        /// Create team with provided model properties
        /// </summary>
        /// <response code="201">Created team with provided model properties</response>
        /// <response code="401">Failed authentication</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Team>> CreateTeam([FromBody, BindRequired]Team team)
        {
            var createdTeam = await _teamService.CreateTeamAsync(team);
            
            return CreatedAtAction(nameof(CreateTeam), createdTeam);
        }
        
        /// <summary>
        /// Create team with customer with provided model properties
        /// </summary>
        /// <response code="201">Created team with customer via provided model properties</response>
        /// <response code="401">Failed authentication</response>
        [HttpPost]
        [Route("customer")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Team>> CreateTeamWithCustomer([FromBody, BindRequired]Team team)
        {
            var user = _claimsReader.GetUserClaims(User);
            var createdTeam = await _teamService.CreateTeamWithCustomerAsync(team, user.UserId);
            
            return CreatedAtAction(nameof(CreateTeam), createdTeam);
        }

        /// <summary>
        /// Update team with provided model properties
        /// </summary>
        /// <response code="200">Updated team with provided model properties</response>
        /// <response code="401">Failed authentication</response>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Team>> UpdateTeam([FromBody, BindRequired] Team team)
        {
            var updatedTeam = await _teamService.UpdateTeamAsync(team);
            
            return updatedTeam;
        }

        /// <summary>
        /// Remove team with provided id
        /// </summary>
        /// <response code="204">Removed team with provided id</response>
        /// <response code="401">Failed authentication</response>
        [HttpDelete]
        [Route("id/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> RemoveTeam(Guid id)
        {
            await _teamService.RemoveTeamAsync(id);
            
            return NoContent();
        }
    }
}