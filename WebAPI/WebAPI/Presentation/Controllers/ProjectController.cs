using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models;
using WebAPI.Models.Result;

namespace WebAPI.Presentation.Controllers
{
    [ApiController]
    [Route("project")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<CollectionResponse<Project>>> GetAllProjects()
            => await _projectService.GetAllProjects();

        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<Project>> GetProject(Guid id)
        {
            var project = await _projectService.GetProject(id);

            if (project == null)
            {
                return NotFound("");
            }
            
            return project;
        }

        [HttpGet]
        [Route("full/{id}")]
        public async Task<ActionResult<FullProjectDescription>> GetProjectFullDescription(Guid id) =>
            await _projectService.GetFullProjectDescription(id);
        
        [HttpPost]
        public async Task<ActionResult<Project>> CreateProject([FromBody, BindRequired]Project project)
        {
            var createdProject = await _projectService.AddProject(project);
            
            return CreatedAtAction(nameof(CreateProject), createdProject);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProject([FromBody, BindRequired] Project project)
        {
            var updatedProject = await _projectService.UpdateProject(project);

            return Ok(updatedProject);
        }

        [HttpDelete]
        public async Task<IActionResult> RemoveProject(Guid id)
        {
            await _projectService.RemoveProject(id);

            return NoContent();
        }
    }
}