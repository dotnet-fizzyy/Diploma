using System;
using System.Threading.Tasks;
using WebAPI.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface ITeamService
    {
        Task<CollectionResponse<Team>> GetAllTeams();

        Task<CollectionResponse<FullTeam>> GetUserTeams(Guid userId);

        Task<Team> GetTeam(Guid teamId);

        Task<FullTeam> GetFullTeamDescription(Guid teamId);

        Task<Team> CreateTeam(Team team);
        
        Task<Team> CreateTeamWithCustomer(Team team, Guid userId);
        
        Task<Team> UpdateTeam(Team team);

        Task RemoveTeam(Guid id);
    }
}