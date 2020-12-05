using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using WebAPI.Core.Enums;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models;
using WebAPI.Models.Result;
using WebAPI.Presentation.Filters;

namespace WebAPI.Presentation.Controllers
{
    [Authorize]
    [ApiController]
    [Route("story")]
    [ServiceFilter(typeof(UserAuthorizationFilter))]
    public class StoryController : ControllerBase
    {
        private readonly IStoryService _storyService;
        private readonly IStorySortingAndFiltering _storySortingAndFiltering;

        public StoryController(IStoryService storyService, IStorySortingAndFiltering storySortingAndFiltering)
        {
            _storyService = storyService;
            _storySortingAndFiltering = storySortingAndFiltering;
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
        [Route("sort")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<CollectionResponse<Story>>> SortStories(
            [FromQuery, BindRequired] Guid epicId,
            [FromQuery, BindRequired] string sortType,
            [FromQuery, BindRequired] OrderType orderType
            )
        {
            var sortedStories = await _storySortingAndFiltering.SortStoriesByCriteria(
                epicId,
                sortType,
                orderType
            );

            if (sortedStories == null)
            {
                return BadRequest("One of parameters was invalid");
            }
            
            return sortedStories;
        }

        [HttpGet]
        [Route("term")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<CollectionResponse<Story>>> GetFullStoriesByTerm(
            [FromQuery, BindRequired] string term,
            [FromQuery, BindRequired] int limit,
            [FromQuery, BindRequired] Guid projectId
        ) => await _storyService.GetFullStoriesByTitleTerm(term, limit, projectId);
        
        
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

        [HttpGet]
        [Route("history/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CollectionResponse<StoryHistory>>> GetStoryHistory(Guid id)
        {
            var storyHistory = await _storyService.GetStoryHistory(id);

            if (storyHistory.Items == null)
            {
                return NotFound();
            }

            return Ok();
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
        
        [HttpPut]
        [Route("part-update")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> UpdatePartsOfStory([FromBody, BindRequired] StoryUpdate storyUpdate)
        {
            var updatedStory = await _storyService.UpdatePartsOfStory(storyUpdate);

            return Ok(updatedStory);
        }

        [HttpPatch]
        [Route("board-move")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> UpdateStoryColumn([FromBody, BindRequired] JsonPatchDocument<Story> storyPatch)
        {
            var storyModel = new Story();
            storyPatch.ApplyTo(storyModel, ModelState);

            var updatedStory = await _storyService.UpdateStoryColumn(storyModel);
            
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