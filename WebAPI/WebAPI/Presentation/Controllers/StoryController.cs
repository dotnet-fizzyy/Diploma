using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models;
using WebAPI.Models.Result;
using WebAPI.Presentation.Filters;

namespace WebAPI.Presentation.Controllers
{
    [ApiController]
    [Route("story")]
    [ServiceFilter(typeof(UserAuthorizationFilter))]
    public class StoryController : ControllerBase
    {
        private readonly IStoryService _storyService;

        public StoryController(IStoryService storyService)
        {
            _storyService = storyService;
        }

        [HttpGet]
        [Route("all")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<CollectionResponse<Story>>> GetAllStories()
            => await _storyService.GetStories();

        [HttpGet]
        [Route("range")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<CollectionResponse<Story>>> GetStoriesByRange(
            [FromQuery, BindRequired] Guid sprintId,
            [FromQuery, BindRequired] int limit,
            [FromQuery, BindRequired] int offset
        ) => await _storyService.GetStoriesByRange(sprintId, limit, offset);
        
        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Story>> GetStory(Guid id)
        {
            var story = await _storyService.GetStory(id);

            if (story == null)
            {
                return NotFound();
            }

            return story;
        }

        [HttpGet]
        [Route("full/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FullStory>> GetFullStoryDescription(Guid id)
        {
            var storyFullDescription = await _storyService.GetFullStoryDescription(id);

            if (storyFullDescription == null)
            {
                return NotFound();
            }

            return storyFullDescription;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Story>> CreateStory([FromBody, BindRequired] Story story)
        {
            var userId = 
                User.Claims.FirstOrDefault(x => ClaimTypes.NameIdentifier == x.Type)?.Value;
            
            var createdStory = await _storyService.AddStory(story);

            return CreatedAtAction(nameof(CreateStory), createdStory);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> UpdateStory([FromBody, BindRequired] Story story)
        {
            var updatedStory = await _storyService.UpdateStory(story);

            return Ok(updatedStory);
        }
        
        [HttpDelete]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> RemoveStory(Guid id)
        {
            await _storyService.RemoveStory(id);
            
            return NoContent();
        }
    }
}