using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Basic;
using WebAPI.Models.Extensions;
using WebAPI.Models.Models.Result;

namespace WebAPI.Presentation.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SprintController : ControllerBase
    {
        private readonly ISprintService _sprintService;
        
        public SprintController(ISprintService sprintService)
        {
            _sprintService = sprintService;
        }
        
        /// <summary>
        /// Gets sprints full description by provided epic and team ids.
        /// </summary>
        /// <param name="epicId">Epic identifier.</param>
        /// <param name="teamId">Epic identifier.</param>
        /// <response code="200">A collection of sprints by provided epic and team ids.</response>
        /// <response code="401">Failed authentication.</response>
        /// <response code="404">Unable to find sprints by provided epic id and team ids.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpGet("epic/id/{epicId:guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CollectionResponse<FullSprint>>> GetAllSprintsFromEpic(
            Guid epicId, 
            [FromQuery] Guid? teamId) => 
                await _sprintService.GetAllSprintsFromEpicAsync(epicId, teamId);

        /// <summary>
        /// Gets sprint by provided id.
        /// </summary>
        /// <param name="id">Sprint identifier.</param>
        /// <response code="200">Sprint by provided id.</response>
        /// <response code="401">Failed authentication.</response>
        /// <response code="404">Unable to find sprint by provided id.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpGet("id/{id:guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Sprint>> GetSprint(Guid id) =>
            await _sprintService.GetByIdAsync(id);

        /// <summary>
        /// Gets sprint full description by provided id.
        /// </summary>
        /// <param name="id">Sprint identifier.</param>
        /// <response code="200">Sprint full description by provided id.</response>
        /// <response code="401">Failed authentication.</response>
        /// <response code="404">Unable to find sprint by provided id.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpGet("full/id/{id:guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FullSprint>> GetFullSprint(Guid id) =>
            await _sprintService.GetFullSprintAsync(id);

        /// <summary>
        /// Creates sprint.
        /// </summary>
        /// <response code="201">Created sprint.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Sprint>> CreateSprint([FromBody, BindRequired] Sprint sprint)
        {
            var createdSprint = await _sprintService.CreateAsync(sprint);

            return CreatedAtAction(nameof(CreateSprint), createdSprint);
        }
        
        /// <summary>
        /// Updates sprint.
        /// </summary>
        /// <param name="sprint"><see cref="Sprint"/> model</param>
        /// <response code="200">Updated sprint.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Sprint>> UpdateSprint([FromBody, BindRequired] Sprint sprint) =>
            await _sprintService.UpdateAsync(sprint);

        /// <summary>
        /// Updates sprint deleted status by provided id.
        /// </summary>
        /// <param name="id">Sprint identifier.</param>
        /// <response code="204">Sprint deleted status was set.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpDelete("soft-remove/id/{id:guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult> SprintSoftRemove(Guid id)
        {
            await _sprintService.SoftRemoveAsync(id);
            
            return NoContent();
        }
        
        /// <summary>
        /// Removes sprint from DB by provided id.
        /// </summary>
        /// <param name="id">Sprint identifier.</param>
        /// <response code="204">Sprint was removed from DB.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpDelete("remove/id/{id:guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult> RemoveSprint(Guid id)
        {
            await _sprintService.RemoveAsync(id);

            return NoContent();
        }
    }
}