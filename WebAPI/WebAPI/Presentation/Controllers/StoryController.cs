using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using WebAPI.Core.Enums;
using WebAPI.Core.Interfaces.Handlers;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Core.Interfaces.Utilities;
using WebAPI.Models.Models;
using WebAPI.Models.Result;
using WebAPI.Presentation.Filters;

namespace WebAPI.Presentation.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/story")]
    [ServiceFilter(typeof(UserAuthorizationFilter))]
    public class StoryController : ControllerBase
    {
        private readonly IStoryService _storyService;
        private readonly IStorySortingAndFiltering _storySortingAndFiltering;
        private readonly IClaimsReader _claimsReader;

        public StoryController(IStoryService storyService, IStorySortingAndFiltering storySortingAndFiltering, IClaimsReader claimsReader)
        {
            _storyService = storyService;
            _storySortingAndFiltering = storySortingAndFiltering;
            _claimsReader = claimsReader;
        }

        /// <summary>
        /// Receive all stories
        /// </summary>
        /// <response code="200">Receiving all stories</response>
        /// <response code="401">Failed authentication</response>
        [HttpGet]
        [Route("all")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<CollectionResponse<Story>>> GetAllStories()
            => await _storyService.GetStories();

        /// <summary>
        /// Receive stories in particular range matches params criteria
        /// </summary>
        /// <response code="200">Received stories in particular range matches params criteria</response>
        /// <response code="401">Failed authentication</response>
        /// <response code="404">Unable to find stories with provided sprint id</response>
        [HttpGet]
        [Route("range")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CollectionResponse<Story>>> GetStoriesByRange(
            [FromQuery, BindRequired] Guid sprintId,
            [FromQuery, BindRequired] int limit,
            [FromQuery, BindRequired] int offset
        ) => await _storyService.GetStoriesByRange(sprintId, limit, offset);

        /// <summary>
        /// Sort stories in particular order from epic by params criteria
        /// </summary>
        /// <response code="200">Sorted stories in particular order from epic by params criteria</response>
        /// <response code="401">Failed authentication</response>
        /// <response code="404">Unable to find stories with provided epic id</response>
        [HttpGet]
        [Route("sort")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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

            return sortedStories;
        }

        /// <summary>
        /// Receive available for user stories that name matches term
        /// </summary>
        /// <response code="200">Received available for user stories that name matches term</response>
        /// <response code="401">Failed authentication</response>
        [HttpGet]
        [Route("term")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<CollectionResponse<Story>>> GetFullStoriesByTerm(
            [FromQuery, BindRequired] string term,
            [FromQuery, BindRequired] int limit,
            [FromQuery, BindRequired] Guid projectId
        ) => await _storyService.GetFullStoriesByTitleTerm(term, limit, projectId);
        
        /// <summary>
        /// Receive story with provided id
        /// </summary>
        /// <response code="200">Received story with provided id</response>
        /// <response code="401">Failed authentication</response>
        /// <response code="404">Unable to find story with provided story id</response>
        [HttpGet]
        [Route("id/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Story>> GetStory(Guid id)
        {
            var story = await _storyService.GetStory(id);

            return story;
        }

        /// <summary>
        /// Receive story full description with provided id
        /// </summary>
        /// <response code="200">Received story full description with provided id</response>
        /// <response code="401">Failed authentication</response>
        /// <response code="404">Unable to find story with provided story id</response>
        [HttpGet]
        [Route("full/id/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<FullStory>> GetFullStoryDescription(Guid id)
        {
            var storyFullDescription = await _storyService.GetFullStoryDescription(id);

            return storyFullDescription;
        }

        /// <summary>
        /// Receive all story history records with provided story id
        /// </summary>
        /// <response code="200">Received all story history records with provided story id</response>
        /// <response code="401">Failed authentication</response>
        /// <response code="404">Unable to find story history records with provided story id</response>
        [HttpGet]
        [Route("history/id/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CollectionResponse<StoryHistory>>> GetStoryHistory(Guid id)
        {
            var storyHistory = await _storyService.GetStoryHistory(id);

            return storyHistory;
        }
        
        /// <summary>
        /// Create story with provided model properties
        /// </summary>
        /// <response code="201">Created story with provided model properties</response>
        /// <response code="401">Failed authentication</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Story>> CreateStory([FromBody, BindRequired] Story story)
        {
            var user = _claimsReader.GetUserClaims(User);
            
            var createdStory = await _storyService.AddStory(story, user.UserId);

            return CreatedAtAction(nameof(CreateStory), createdStory);
        }

        /// <summary>
        /// Update story with provided model properties
        /// </summary>
        /// <response code="200">Updated story with provided model properties</response>
        /// <response code="401">Failed authentication</response>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Story>> UpdateStory([FromBody, BindRequired] Story story)
        {
            var updatedStory = await _storyService.UpdateStory(story);

            return updatedStory;
        }
        
        /// <summary>
        /// Update story and write updates to story history with provided model properties
        /// </summary>
        /// <response code="200">Updated story and wrote updates to story history with provided model properties</response>
        /// <response code="401">Failed authentication</response>
        [HttpPut]
        [Route("part-update")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Story>> UpdatePartsOfStory([FromBody, BindRequired] StoryUpdate storyUpdate)
        {
            var user = _claimsReader.GetUserClaims(User);
            
            var updatedStory = await _storyService.UpdatePartsOfStory(storyUpdate, user.UserId);

            return updatedStory;
        }

        /// <summary>
        /// Update story board column with provided story id
        /// </summary>
        /// <response code="200">Updated story board column with provided story id</response>
        /// <response code="400">Invalid data in request model</response>
        /// <response code="401">Failed authentication</response>
        [HttpPatch]
        [Route("board-move")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Story>> UpdateStoryColumn([FromBody, BindRequired] JsonPatchDocument<Story> storyPatch)
        {
            var storyModel = new Story();
            storyPatch.ApplyTo(storyModel, ModelState);

            var updatedStory = await _storyService.UpdateStoryColumn(storyModel);
            
            return updatedStory;
        }
        
        /// <summary>
        /// Update story status with provided story id
        /// </summary>
        /// <response code="204">Updated story status with provided story id</response>
        /// <response code="400">Invalid data in request model</response>
        /// <response code="401">Failed authentication</response>
        [HttpPatch]
        [Route("change-status")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> ChangeStoryStatus([FromBody, BindRequired] JsonPatchDocument<Story> storyPatch)
        {
            var storyModel = new Story();
            storyPatch.ApplyTo(storyModel, ModelState);

            await _storyService.ChangeStoryStatus(storyModel);
            
            return NoContent();
        }
        
        /// <summary>
        /// Remove story with provided id
        /// </summary>
        /// <response code="204">Removed story with provided id</response>
        /// <response code="401">Failed authentication</response>
        [HttpDelete]
        [Route("id/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> RemoveStory(Guid id)
        {
            await _storyService.RemoveStory(id);
            
            return NoContent();
        }
    }
}