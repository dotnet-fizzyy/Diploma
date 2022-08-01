using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models.Models;
using WebAPI.Presentation.Utilities;

namespace WebAPI.Presentation.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class WorkSpaceController : ControllerBase
    {
        private readonly IWorkSpaceService _workSpaceService;

        public WorkSpaceController(IWorkSpaceService workSpaceService)
        {
            _workSpaceService = workSpaceService;
        }

        /// <summary>
        /// Gets workspace by provided id.
        /// </summary>
        /// <param name="id">Workspace identifier.</param>
        /// <response code="200">Gets workspace by provided id.</response>
        /// <response code="401">Failed authentication.</response>
        /// <response code="404">Unable to find workspace by provided id.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpGet("id/{id:guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<WorkSpace>> GetWorkSpaceById(Guid id) =>
            await _workSpaceService.GetByIdAsync(id);

        /// <summary>
        /// Gets workspace that belongs to user by access token.
        /// </summary>
        /// <response code="200">Gets workspace that belongs to user.</response>
        /// <response code="401">Failed authentication.</response>
        /// <response code="404">Unable to find workspace that belongs to user.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpGet("user")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<WorkSpace>> GetUserWorkSpace()
        {
            var user = ClaimsReader.GetUserClaims(User);
            
            var workSpace = await _workSpaceService.GetUsersWorkSpaceAsync(user.UserId);

            return workSpace;
        }
        
        /// <summary>
        /// Creates workspace.
        /// </summary>
        /// <param name="workSpace"><see cref="WorkSpace"/> model.</param>
        /// <response code="201">Created workspace.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<WorkSpace>> CreateWorkSpace([FromBody] WorkSpace workSpace)
        {
            var createdWorkSpace = await _workSpaceService.CreateAsync(workSpace);

            return CreatedAtAction(nameof(CreateWorkSpace), createdWorkSpace);
        }
        
        /// <summary>
        /// Creates workspace and assign it to user.
        /// </summary>
        /// <param name="workSpace"><see cref="WorkSpace"/> model.</param>
        /// <response code="201">Created workspace and assigned it to user.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpPost("user")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<WorkSpace>> CreateWorkSpaceWithUser([FromBody, BindRequired] WorkSpace workSpace)
        {
            var user = ClaimsReader.GetUserClaims(User);
            
            var createdWorkSpace = await _workSpaceService.CreateWithUserAsync(workSpace, user.UserId);

            return CreatedAtAction(nameof(CreateWorkSpaceWithUser), createdWorkSpace);
        }
        
        /// <summary>
        /// Updates workspace.
        /// </summary>
        /// <param name="workSpace"><see cref="WorkSpace"/> model.</param>
        /// <response code="200">Updated workspace.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<WorkSpace>> UpdateWorkSpace([FromBody] WorkSpace workSpace) =>
            await _workSpaceService.UpdateAsync(workSpace);

        /// <summary>
        /// Removes workspace from DB by provided id.
        /// </summary>
        /// <param name="id">Workspace identifier.</param>
        /// <response code="204">Workspace was removed from DB.</response>
        /// <response code="401">Failed authentication.</response>
        /// <returns>A <see cref="Task"/> representing the asynchronous operation.</returns>
        [HttpDelete("id/{id:guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult> RemoveWorkSpace(Guid id)
        {
            await _workSpaceService.RemoveAsync(id);

            return NoContent();
        }
    }
}