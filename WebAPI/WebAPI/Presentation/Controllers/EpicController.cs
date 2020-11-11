using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models;
using WebAPI.Models.Result;

namespace WebAPI.Presentation.Controllers
{
    [ApiController]
    [Route("epic")]
    public class EpicController : ControllerBase
    {
        private readonly IEpicService _epicService;

        public EpicController(IEpicService epicService)
        {
            _epicService = epicService;
        }

        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<CollectionResponse<Epic>>> GetEpics() => await _epicService.GetEpics();
        
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Epic>> GetEpic(Guid id) => await _epicService.GetEpic(id);

        [HttpGet]
        [Route("full/{id}")]
        public async Task<ActionResult<FullEpic>> GetFullEpicDescription(Guid id) =>
            await _epicService.GetFullEpicDescription(id);

        [HttpPost]
        public async Task<ActionResult<Epic>> CreateEpic([FromBody, BindRequired] Epic epic)
        {
            var createdEpic = await _epicService.CreateEpic(epic);

            return CreatedAtAction(nameof(CreateEpic), createdEpic);
        }
        
        [HttpPut]
        public async Task<IActionResult> UpdateEpic([FromBody, BindRequired] Epic epic)
        {
            var updatedEpic = await _epicService.UpdateEpic(epic);

            return Ok(updatedEpic);
        }
        
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> RemoveEpic(Guid id)
        { 
            await _epicService.RemoveEpic(id);

            return NoContent();
        }
    }
}