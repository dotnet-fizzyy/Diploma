using System;
using System.Threading.Tasks;
using WebAPI.Models.Models;
using WebAPI.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface ITeamService
    {
        Task<CollectionResponse<Team>> GetAllTeams();

        Task<Team> GetTeam(Guid teamId);

        Task<FullTeam> GetFullTeamDescription(Guid teamId);

        Task<Team> CreateTeam(Team team);
        
        Task<Team> UpdateTeam(Team team);

        Task RemoveTeam(Guid id);
    }
}