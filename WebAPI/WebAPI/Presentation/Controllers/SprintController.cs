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
    [Route("sprint")]
    public class SprintController : ControllerBase
    {
        private readonly ISprintService _sprintService;

        public SprintController(ISprintService sprintService)
        {
            _sprintService = sprintService;
        }

        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<CollectionResponse<Sprint>>> GetAllSprints() => await _sprintService.GetALlSprints();

        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Sprint>> GetSprint(Guid id)
        {
            var sprint = await _sprintService.GetSprint(id);

            if (sprint == null)
            {
                return NotFound();
            }
            
            return sprint;
        }

        [HttpGet]
        [Route("full/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FullSprint>> GetFullSprint(Guid id)
        {
            var fullSprint =  await _sprintService.GetFullSprint(id);

            if (fullSprint == null)
            {
                return NotFound();
            }
            
            return fullSprint;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<Sprint>> CreateSprint([FromBody, BindRequired] Sprint sprint)
        {
            var createdSprint = await _sprintService.CreateSprint(sprint);

            return CreatedAtAction(nameof(CreateSprint), createdSprint);
        }
        
        [HttpPut]
        public async Task<IActionResult> UpdateSprint([FromBody, BindRequired] Sprint sprint)
        {
            var updatedSprint = await _sprintService.UpdateSprint(sprint);

            return Ok(updatedSprint);
        }
        
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> RemoveSprint(Guid id)
        {
            await _sprintService.RemoveSprint(id);

            return NoContent();
        }
    }
}