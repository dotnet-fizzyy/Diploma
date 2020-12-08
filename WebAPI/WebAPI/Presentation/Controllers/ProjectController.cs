using System;
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
    //[Authorize]
    [ApiController]
    [Route("project")]
    //[ServiceFilter(typeof(UserAuthorizationFilter))]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet]
        [Route("all")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<CollectionResponse<Project>>> GetAllProjects()
            => await _projectService.GetAllProjects();

        [HttpGet]
        [Route("user/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<CollectionResponse<FullProject>>> GetAllProjectByUserId(Guid userId) =>
            await _projectService.GetProjectsByUserId(userId);

        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Project>> GetProject(Guid id)
        {
            var project = await _projectService.GetProject(id);

            if (project == null)
            {
                return NotFound();
            }
            
            return project;
        }

        [HttpGet]
        [Route("full-desc/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FullProjectDescription>> GetProjectFullDescription(Guid id)
        {
            var fullProjectDescription = await _projectService.GetFullProjectDescription(id);

            if (fullProjectDescription == null)
            {
                return NotFound();
            }

            return fullProjectDescription;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Project>> CreateProject([FromBody, BindRequired]Project project)
        {
            var createdProject = await _projectService.AddProject(project);
            
            return CreatedAtAction(nameof(CreateProject), createdProject);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> UpdateProject([FromBody, BindRequired] Project project)
        {
            var updatedProject = await _projectService.UpdateProject(project);

            return Ok(updatedProject);
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> RemoveProject(Guid id)
        {
            await _projectService.RemoveProject(id);

            return NoContent();
        }
    }
}