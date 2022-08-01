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
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }
        
        /// <summary>
        /// Gets project by provided id.
        /// </summary>
        /// <param name="id">Project identifier.</param>
        /// <response code="200">Project by provided id.</response>
        /// <response code="401">Failed authentication.</response>
        /// <response code="404">Unable to find project by provided id.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpGet("id/{id:guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Project>> GetProject(Guid id) =>
            await _projectService.GetByIdAsync(id);

        /// <summary>
        /// Gets project full description by provided id.
        /// </summary>
        /// <param name="id">Project identifier.</param>
        /// <response code="200">Project full model by provided id.</response>
        /// <response code="401">Failed authentication.</response>
        /// <response code="404">Unable to find project by provided id.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpGet("full/id/{id:guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FullProjectDescription>> GetProjectFullDescription(Guid id) =>
            await _projectService.GetFullDescriptionAsync(id);

        /// <summary>
        /// Creates project.
        /// </summary>
        /// <param name="project"><see cref="Project"/> model.</param>
        /// <response code="201">Created project.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Project>> CreateProject([FromBody, BindRequired] Project project)
        {
            var createdProject = await _projectService.CreateAsync(project);

            return CreatedAtAction(nameof(CreateProject), createdProject);
        }

        /// <summary>
        /// Updates project.
        /// </summary>
        /// <param name="project"><see cref="Project"/> model.</param>
        /// <response code="200">Updated project.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Project>> UpdateProject([FromBody, BindRequired] Project project) =>
            await _projectService.UpdateAsync(project);

        /// <summary>
        /// Updates project deleted status by provided id.
        /// </summary>
        /// <param name="id">Project identifier.</param>
        /// <response code="204">Project deleted status was set.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpDelete("soft-remove/id/{id:guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult> ProjectSoftRemove(Guid id)
        {
            await _projectService.SoftRemoveAsync(id);
            
            return NoContent();
        }
        
        /// <summary>
        /// Removes project from DB by provided id.
        /// </summary>
        /// <param name="id">Project identifier.</param>
        /// <response code="204">Project was removed from DB.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpDelete("remove/id/{id:guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult> RemoveProject(Guid id)
        {
            await _projectService.RemoveAsync(id);

            return NoContent();
        }
    }
}