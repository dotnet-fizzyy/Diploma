using System;
using System.Threading.Tasks;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface ITeamService
    {
        Task<CollectionResponse<FullTeam>> GetUserTeamsAsync(Guid userId);

        Task<Team> GetTeamByIdAsync(Guid teamId);

        Task<FullTeam> GetFullTeamDescriptionAsync(Guid teamId);

        Task<Team> CreateTeamAsync(Team team);
        
        Task<Team> CreateTeamWithCustomerAsync(Team team, Guid userId);
        
        Task<Team> UpdateTeamAsync(Team team);

        Task RemoveTeamSoftAsync(Team team); 
        
        Task RemoveTeamAsync(Guid id);
    }
}