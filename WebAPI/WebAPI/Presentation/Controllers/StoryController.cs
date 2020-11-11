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
    [Route("story")]
    public class StoryController : ControllerBase
    {
        private readonly IStoryService _storyService;

        public StoryController(IStoryService storyService)
        {
            _storyService = storyService;
        }

        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<CollectionResponse<Story>>> GetAllStories() => await _storyService.GetStories();

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Story>> GetStory(Guid id) => await _storyService.GetStory(id);

        [HttpGet]
        [Route("full/{id}")]
        public async Task<FullStory> GetFullStoryDescription(Guid id) =>
            await _storyService.GetFullStoryDescription(id);

        [HttpPost]
        public async Task<ActionResult<Story>> CreateStory([FromBody, BindRequired] Story story)
        {
            var createdStory = await _storyService.AddStory(story);

            return CreatedAtAction(nameof(CreateStory), createdStory);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateStory([FromBody, BindRequired] Story story)
        {
            var updatedStory = await _storyService.UpdateStory(story);

            return Ok(updatedStory);
        }
        
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> RemoveStory(Guid id)
        {
            await _storyService.RemoveStory(id);
            
            return NoContent();
        }
    }
}