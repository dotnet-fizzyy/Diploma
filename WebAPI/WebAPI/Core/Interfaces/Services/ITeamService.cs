using System;
using System.Threading.Tasks;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface ITeamService
    {
        Task<CollectionResponse<FullTeam>> GetUserTeamsAsync(Guid userId);

        Task<Team> GetByIdAsync(Guid id);

        Task<FullTeam> GetFullDescriptionAsync(Guid id);

        Task<Team> CreateAsync(Team team);

        Task AssignUserToTeam(Guid userId, Guid teamId);

        Task<Team> UpdateAsync(Team team);

        Task SoftRemoveAsync(Guid id); 
        
        Task RemoveAsync(Guid id);
    }
}