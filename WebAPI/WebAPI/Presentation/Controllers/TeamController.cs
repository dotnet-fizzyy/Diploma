using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Basic;
using WebAPI.Models.Complete;
using WebAPI.Models.Extensions;
using WebAPI.Presentation.Models.Request;
using WebAPI.Presentation.Utilities;

namespace WebAPI.Presentation.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TeamController : ControllerBase
    {
        private readonly ITeamService _teamService;

        public TeamController(ITeamService teamService)
        {
            _teamService = teamService;
        }
        
        /// <summary>
        /// Gets teams that belong to user by access token.
        /// </summary>
        /// <response code="200">Gets teams that belong to user.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpGet("user")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<CollectionResponse<TeamComplete>>> GetUserTeams()
        {
            var user = ClaimsReader.GetUserClaims(User);
            
            return await _teamService.GetUserTeamsAsync(user.UserId);
        }
        
        /// <summary>
        /// Gets team by provided id.
        /// </summary>
        /// <param name="id">Team identifier.</param>
        /// <response code="200">Gets team description by provided id.</response>
        /// <response code="401">Failed authentication.</response>
        /// <response code="404">Unable to find team by provided id</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpGet("id/{id:guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Team>> GetTeam(Guid id) => 
            await _teamService.GetByIdAsync(id);

        /// <summary>
        /// Gets team complete description by provided id.
        /// </summary>
        /// <param name="id">Team identifier.</param>
        /// <response code="200">Gets team full description by provided id.</response>
        /// <response code="401">Failed authentication.</response>
        /// <response code="404">Unable to find project by provided id.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpGet("complete/id/{id:guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<TeamComplete>> GetCompleteDescription(Guid id) =>
            await _teamService.GetCompleteDescriptionAsync(id);

        /// <summary>
        /// Creates team.
        /// </summary>
        /// <param name="team"><see cref="Team"/> model.</param>
        /// <response code="201">Created team.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Team>> CreateTeam([FromBody, BindRequired] Team team)
        {
            var createdTeam = await _teamService.CreateAsync(team);
            
            return CreatedAtAction(nameof(CreateTeam), createdTeam);
        }
        
        /// <summary>
        /// Assigns user to the team.
        /// </summary>
        /// <param name="requestModel"><see cref="AssignUserToTeamRequestModel"/> identifier.</param>
        /// <response code="204">User was assigned to team.</response>
        /// <response code="401">Failed authentication.</response>
        /// <response code="404">Unable to find team or user by provided ids.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpPost("assign-user")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Team>> AssignUserToTeam(
            [FromBody, BindRequired] AssignUserToTeamRequestModel requestModel)
        {
            await _teamService.AssignUserToTeam(requestModel.UserId, requestModel.TeamId);
            
            return NoContent();
        }

        /// <summary>
        /// Updates team.
        /// </summary>
        /// <param name="team"><see cref="Team"/> model.</param>
        /// <response code="200">Updated team.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Team>> UpdateTeam([FromBody, BindRequired] Team team) =>
            await _teamService.UpdateAsync(team);

        /// <summary>
        /// Updates team deleted status by provided id.
        /// </summary>
        /// <param name="id">Team identifier.</param>
        /// <response code="204">Team deleted status was set.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpDelete("soft-remove/id/{id:guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult> TeamSoftRemove(Guid id)
        {
            await _teamService.SoftRemoveAsync(id);
            
            return NoContent();
        }
        
        /// <summary>
        /// Removes team from DB by provided id.
        /// </summary>
        /// <param name="id">Team identifier.</param>
        /// <response code="204">Team was removed from DB.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpDelete("remove/id/{id:guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult> RemoveTeam(Guid id)
        {
            await _teamService.RemoveAsync(id);
            
            return NoContent();
        }
    }
}