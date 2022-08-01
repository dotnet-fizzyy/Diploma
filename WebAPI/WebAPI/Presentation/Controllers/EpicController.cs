using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.Presentation.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class EpicController : ControllerBase
    {
        private readonly IEpicService _epicService;

        public EpicController(IEpicService epicService)
        {
            _epicService = epicService;
        }
        
        /// <summary>
        /// Gets epic by provided id.
        /// </summary>
        /// <param name="id">Epic identifier.</param>
        /// <response code="200">Epic by provided id.</response>
        /// <response code="401">Failed authentication.</response>
        /// <response code="404">Unable to find epic by provided id.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpGet("id/{id:guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Epic>> GetEpicById(Guid id) =>
            await _epicService.GetByIdAsync(id);

        /// <summary>
        /// Gets epics from project by provided project id.
        /// </summary>
        /// <param name="projectId">Project identifier.</param>
        /// <response code="200">A collection of epics from project found by provided project id.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpGet("project/id/{projectId:guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<CollectionResponse<Epic>>> GetEpicsFromProject(Guid projectId) => 
            await _epicService.GetEpicsFromProjectAsync(projectId);
        
        /// <summary>
        /// Gets epic full description by provided id.
        /// </summary>
        /// <param name="id">Epic identifier.</param>
        /// <response code="200">Epic full model by provided id.</response>
        /// <response code="401">Failed authentication.</response>
        /// <response code="404">Unable to find epic by provided id.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpGet("full/id/{id:guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FullEpic>> GetFullEpicDescription(Guid id) => 
            await _epicService.GetFullDescriptionAsync(id);

        /// <summary>
        /// Creates epic.
        /// </summary>
        /// <param name="epic"><see cref="Epic"/> model.</param>
        /// <response code="201">Created epic.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Epic>> CreateEpic([FromBody, BindRequired] Epic epic)
        {
            var createdEpic = await _epicService.CreateAsync(epic);

            return CreatedAtAction(nameof(CreateEpic), createdEpic);
        }
        
        /// <summary>
        /// Updates epic.
        /// </summary>
        /// <param name="epic"><see cref="Epic"/> model.</param>
        /// <response code="200">Updated epic.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Epic>> UpdateEpic([FromBody, BindRequired] Epic epic) =>
            await _epicService.UpdateAsync(epic);

        /// <summary>
        /// Updates epic deleted status by provided id.
        /// </summary>
        /// <param name="id">Epic identifier.</param>
        /// <response code="204">Epic deleted status was set.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpDelete("soft-remove/id/{id:guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult> EpicSoftRemove(Guid id)
        {
            await _epicService.SoftRemoveAsync(id);
            
            return NoContent();
        }
        
        /// <summary>
        /// Removes epic from DB by provided id.
        /// </summary>
        /// <param name="id">Epic identifier.</param>
        /// <response code="204">Epic was removed from DB.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpDelete("remove/id/{id:guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult> RemoveEpic(Guid id)
        { 
            await _epicService.RemoveAsync(id);

            return NoContent();
        }
    }
}