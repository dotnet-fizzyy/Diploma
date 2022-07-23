using System;
using System.Threading.Tasks;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface ITeamService
    {
        Task<CollectionResponse<FullTeam>> GetUserTeamsAsync(Guid userId);

        Task<Team> GetByIdAsync(Guid teamId);

        Task<FullTeam> GetFullDescriptionAsync(Guid teamId);

        Task<Team> CreateAsync(Team team);
        
        Task<Team> CreateAndAssignCustomerAsync(Team team, Guid userId);
        
        Task<Team> UpdateAsync(Team team);

        Task SoftRemoveAsync(Guid id); 
        
        Task RemoveAsync(Guid id);
    }
}