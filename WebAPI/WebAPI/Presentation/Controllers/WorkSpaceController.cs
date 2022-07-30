using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        /// Receive workspace by provided id
        /// </summary>
        /// <response code="200">Receiving workspace by provided id</response>
        /// <response code="401">Failed authentication</response>
        /// <response code="404">Unable to find workspace by provided id</response>
        [HttpGet]
        [Route("id/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<WorkSpace>> GetWorkSpaceById(Guid id)
        {
            var workSpace = await _workSpaceService.GetByIdAsync(id);

            return workSpace;
        }

        /// <summary>
        /// Receive workspace for exact user
        /// </summary>
        /// <response code="200">Receiving workspace for exact user</response>
        /// <response code="401">Failed authentication</response>
        /// <response code="404">Unable to find workspace</response>
        [HttpGet]
        [Route("user")]
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
        /// Create workspace with provided model properties
        /// </summary>
        /// <response code="201">Created workspace with provided model properties</response>
        /// <response code="401">Failed authentication</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<WorkSpace>> CreateWorkSpace([FromBody] WorkSpace workSpace)
        {
            var createdWorkSpace = await _workSpaceService.CreateAsync(workSpace);

            return CreatedAtAction(nameof(CreateWorkSpace), createdWorkSpace);
        }
        
        /// <summary>
        /// Create workspace and assign it to user with provided model properties
        /// </summary>
        /// <response code="201">Created workspace and assigned it to user with provided model properties</response>
        /// <response code="400">Unable to find user with provided user id</response>
        /// <response code="401">Failed authentication</response>
        [HttpPost]
        [Route("user")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<WorkSpace>> CreateWorkSpaceWithUser([FromBody] WorkSpace workSpace)
        {
            var user = ClaimsReader.GetUserClaims(User);
            
            var createdWorkSpace = await _workSpaceService.CreateWithUserAsync(workSpace, user.UserId);

            return CreatedAtAction(nameof(CreateWorkSpaceWithUser), createdWorkSpace);
        }
        
        /// <summary>
        /// Update workspace with provided model properties
        /// </summary>
        /// <response code="200">Updated workspace with provided model properties</response>
        /// <response code="401">Failed authentication</response>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<WorkSpace>> UpdateWorkSpace([FromBody] WorkSpace workSpace)
        {
            var createdWorkSpace = await _workSpaceService.UpdateAsync(workSpace);

            return createdWorkSpace;
        }
        
        /// <summary>
        /// Remove workspace with provided id
        /// </summary>
        /// <response code="204">Removed workspace with provided id</response>
        /// <response code="401">Failed authentication</response>
        [HttpDelete]
        [Route("id/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> RemoveWorkSpace(Guid id)
        {
            await _workSpaceService.RemoveAsync(id);

            return NoContent();
        }
    }
}