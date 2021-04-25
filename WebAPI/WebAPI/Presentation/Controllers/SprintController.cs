using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Core.Interfaces.Utilities;
using WebAPI.Models.Models;
using WebAPI.Models.Models.Result;
using WebAPI.Presentation.Filters;

namespace WebAPI.Presentation.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/sprint")]
    [ServiceFilter(typeof(UserAuthorizationFilter))]
    public class SprintController : ControllerBase
    {
        private readonly ISprintService _sprintService;
        private readonly IClaimsReader _claimsReader;
        
        public SprintController(ISprintService sprintService, IClaimsReader claimsReader)
        {
            _sprintService = sprintService;
            _claimsReader = claimsReader;
        }
        
        /// <summary>
        /// Receive all available sprints
        /// </summary>
        /// <response code="200">Receiving all sprints</response>
        /// <response code="401">Failed authentication</response>
        [HttpGet]
        [Route("all")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<CollectionResponse<Sprint>>> GetAllSprints() => await _sprintService.GetALlSprintsAsync();

        /// <summary>
        /// Receive all sprints with description from epic by provided epic id
        /// </summary>
        /// <response code="200">Receiving all sprints from epic by provided epic id</response>
        /// <response code="401">Failed authentication</response>
        /// <response code="404">Unable to find sprints with description by provided epic id</response>
        [HttpGet]
        [Route("epic/id/{epicId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CollectionResponse<FullSprint>>> GetAllSprintsFromEpic(Guid epicId)
        {
            var user = _claimsReader.GetUserClaims(User);
            
            var boardResponse = await _sprintService.GetAllSprintsFromEpicAsync(epicId, user.UserId);

            return boardResponse;
        }

        /// <summary>
        /// Receive sprint by provided id
        /// </summary>
        /// <response code="200">Receiving sprint by provided id</response>
        /// <response code="401">Failed authentication</response>
        /// <response code="404">Unable to find sprint by provided id</response>
        [HttpGet]
        [Route("id/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Sprint>> GetSprint(Guid id)
        {
            var sprint = await _sprintService.GetSprintByIdAsync(id);

            return sprint;
        }
        
        /// <summary>
        /// Receive sprint with full description by provided id
        /// </summary>
        /// <response code="200">Receiving sprint with full description by provided id</response>
        /// <response code="401">Failed authentication</response>
        /// <response code="404">Unable to find sprint with full description by provided id</response>
        [HttpGet]
        [Route("full/id/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FullSprint>> GetFullSprint(Guid id)
        {
            var fullSprint =  await _sprintService.GetFullSprintAsync(id);

            return fullSprint;
        }

        /// <summary>
        /// Create sprint with provided model properties
        /// </summary>
        /// <response code="201">Created sprint with provided model properties</response>
        /// <response code="401">Failed authentication</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Sprint>> CreateSprint([FromBody, BindRequired] Sprint sprint)
        {
            var createdSprint = await _sprintService.CreateSprintAsync(sprint);

            return CreatedAtAction(nameof(CreateSprint), createdSprint);
        }
        
        /// <summary>
        /// Update sprint with provided model properties
        /// </summary>
        /// <response code="200">Updated sprint with provided model properties</response>
        /// <response code="401">Failed authentication</response>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> UpdateSprint([FromBody, BindRequired] Sprint sprint)
        {
            var updatedSprint = await _sprintService.UpdateSprintAsync(sprint);

            return Ok(updatedSprint);
        }
        
        /// <summary>
        /// Remove sprint with provided id
        /// </summary>
        /// <response code="204">Removed sprint with provided id</response>
        /// <response code="401">Failed authentication</response>
        [HttpDelete]
        [Route("id/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> RemoveSprint(Guid id)
        {
            await _sprintService.RemoveSprintAsync(id);

            return NoContent();
        }
    }
}