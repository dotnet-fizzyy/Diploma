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
    [Route("api/project")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }
        
        /// <summary>
        /// Receive project by provided id
        /// </summary>
        /// <response code="200">Receiving project by provided id</response>
        /// <response code="401">Failed authentication</response>
        /// <response code="404">Unable to find project by provided id</response>
        [HttpGet]
        [Route("id/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Project>> GetProject(Guid id) =>
            await _projectService.GetProjectAsync(id);

        /// <summary>
        /// Receive full project description by provided id
        /// </summary>
        /// <response code="200">Receiving full project description by provided id</response>
        /// <response code="401">Failed authentication</response>
        /// <response code="404">Unable to find project by provided id</response>
        [HttpGet]
        [Route("full-desc/id/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FullProjectDescription>> GetProjectFullDescription(Guid id) =>
            await _projectService.GetFullProjectDescriptionAsync(id);

        /// <summary>
        /// Create project with provided model properties
        /// </summary>
        /// <response code="201">Created project with provided model properties</response>
        /// <response code="401">Failed authentication</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Project>> CreateProject([FromBody, BindRequired]Project project) =>
            await _projectService.CreateProjectAsync(project);

        /// <summary>
        /// Update project with provided model properties
        /// </summary>
        /// <response code="200">Updated project with provided model properties</response>
        /// <response code="401">Failed authentication</response>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Project>> UpdateProject([FromBody, BindRequired] Project project) =>
            await _projectService.UpdateProjectAsync(project);

        /// <summary>
        /// Remove project with provided id
        /// </summary>
        /// <response code="204">Removed project with provided id</response>
        /// <response code="401">Failed authentication</response>
        [HttpDelete]
        [Route("id/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> RemoveProject(Guid id)
        {
            await _projectService.RemoveProjectAsync(id);

            return NoContent();
        }
    }
}