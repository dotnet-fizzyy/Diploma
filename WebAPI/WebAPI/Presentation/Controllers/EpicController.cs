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
    [Route("api/epic")]
    public class EpicController : ControllerBase
    {
        private readonly IEpicService _epicService;

        public EpicController(IEpicService epicService)
        {
            _epicService = epicService;
        }
        
        /// <summary>
        /// Receive epic by provided id
        /// </summary>
        /// <response code="200">Found epic by provided id</response>
        /// <response code="401">Failed authentication</response>
        /// <response code="404">Unable to find epic by provided id</response>
        [HttpGet]
        [Route("id/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Epic>> GetEpic(Guid id)
        {
            var epic = await _epicService.GetEpicByIdAsync(id);

            return epic;
        }
        
        /// <summary>
        /// Receive all project epics by provided project id
        /// </summary>
        /// <response code="200">All found epics from project by provided project id</response>
        /// <response code="401">Failed authentication</response>
        [HttpGet]
        [Route("project/id/{projectId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<CollectionResponse<Epic>>> GetEpicsFromProject(Guid projectId) 
            => await _epicService.GetEpicsFromProjectAsync(projectId);
        
        /// <summary>
        /// Receive epic with sprints by provided id
        /// </summary>
        /// <response code="200">Found epic with sprints by provided id</response>
        /// <response code="401">Failed authentication</response>
        /// <response code="404">Unable to find epic by provided id</response>
        [HttpGet]
        [Route("full/id/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FullEpic>> GetFullEpicDescription(Guid id)
        {
            var fullEpic = await _epicService.GetFullEpicDescriptionAsync(id);

            return fullEpic;
        }
        
        /// <summary>
        /// Create epic with provided model properties
        /// </summary>
        /// <response code="201">Created epic with provided model properties</response>
        /// <response code="401">Failed authentication</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Epic>> CreateEpic([FromBody, BindRequired] Epic epic)
        {
            var createdEpic = await _epicService.CreateEpicAsync(epic);

            return CreatedAtAction(nameof(CreateEpic), createdEpic);
        }
        
        /// <summary>
        /// Update epic with provided model properties
        /// </summary>
        /// <response code="200">Updated epic with provided model properties</response>
        /// <response code="401">Failed authentication</response>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> UpdateEpic([FromBody, BindRequired] Epic epic)
        {
            var updatedEpic = await _epicService.UpdateEpicAsync(epic);

            return Ok(updatedEpic);
        }
        
        /// <summary>
        /// Remove epic with provided id
        /// </summary>
        /// <response code="204">Removed epic with provided id</response>
        /// <response code="401">Failed authentication</response>
        [HttpDelete]
        [Route("id/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> RemoveEpic(Guid id)
        { 
            await _epicService.RemoveEpicAsync(id);

            return NoContent();
        }
    }
}