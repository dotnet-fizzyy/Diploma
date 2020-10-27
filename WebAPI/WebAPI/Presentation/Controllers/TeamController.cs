using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models;

namespace WebAPI.Presentation.Controllers
{
    [ApiController]
    [Route("team")]
    public class TeamController : ControllerBase
    {
        private readonly ITeamService _teamService;

        public TeamController(ITeamService teamService)
        {
            _teamService = teamService;
        }

        [HttpGet]
        [Route("{teamId}")]
        public async Task<IActionResult> GetTeam(Guid teamId)
        {
            return Ok();
        }
        
        [HttpPost]
        public async Task<IActionResult> CreateTeam([FromBody]Team team)
        {
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateTeam([FromBody] Team team)
        {
            return Ok();
        }
    }
}