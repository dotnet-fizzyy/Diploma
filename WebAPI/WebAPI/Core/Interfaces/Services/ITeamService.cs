using System;
using System.Threading.Tasks;
using WebAPI.Models.Basic;
using WebAPI.Models.Complete;
using WebAPI.Models.Extensions;

namespace WebAPI.Core.Interfaces.Services
{
    public interface ITeamService
    {
        Task<CollectionResponse<TeamComplete>> GetUserTeamsAsync(Guid userId);

        Task<CollectionResponse<Team>> SearchTeams(Guid userId, string searchTerm, int limit, int offset);

        Task<Team> GetByIdAsync(Guid id);

        Task<TeamComplete> GetCompleteDescriptionAsync(Guid id);

        Task<Team> CreateAsync(Team team);

        Task AssignUserToTeam(Guid userId, Guid teamId);

        Task<Team> UpdateAsync(Team team);

        Task SoftRemoveAsync(Guid id); 
        
        Task RemoveAsync(Guid id);
    }
}