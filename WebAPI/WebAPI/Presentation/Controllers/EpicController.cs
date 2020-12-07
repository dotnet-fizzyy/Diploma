using System;
using System.Linq;
using System.Security.Claims;
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
    [Authorize]
    [ApiController]
    [Route("epic")]
    [ServiceFilter(typeof(UserAuthorizationFilter))]
    public class EpicController : ControllerBase
    {
        private readonly IEpicService _epicService;

        public EpicController(IEpicService epicService)
        {
            _epicService = epicService;
        }

        [HttpGet]
        [Route("all")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<CollectionResponse<Epic>>> GetEpics() => await _epicService.GetEpics();

        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Epic>> GetEpic(Guid id)
        {
            var epic = await _epicService.GetEpic(id);

            if (epic == null)
            {
                return NotFound();
            }
            
            return epic;
        }
        
        [HttpGet]
        [Route("/project/{projectId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Epic>> GetEpicsFromProject(Guid projectId)
        {
            var userId = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;

            if (userId == null)
            {
                return BadRequest();
            }
            
            var epic = await _epicService.GetEpic(projectId);

            if (epic == null)
            {
                return NotFound();
            }
            
            return epic;
        }

        [HttpGet]
        [Route("full/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FullEpic>> GetFullEpicDescription(Guid id)
        {
            var fullEpic = await _epicService.GetFullEpicDescription(id);

            if (fullEpic == null)
            {
                return NotFound();
            }

            return fullEpic;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Epic>> CreateEpic([FromBody, BindRequired] Epic epic)
        {
            var createdEpic = await _epicService.CreateEpic(epic);

            return CreatedAtAction(nameof(CreateEpic), createdEpic);
        }
        
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> UpdateEpic([FromBody, BindRequired] Epic epic)
        {
            var updatedEpic = await _epicService.UpdateEpic(epic);

            return Ok(updatedEpic);
        }
        
        [HttpDelete]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> RemoveEpic(Guid id)
        { 
            await _epicService.RemoveEpic(id);

            return NoContent();
        }
    }
}