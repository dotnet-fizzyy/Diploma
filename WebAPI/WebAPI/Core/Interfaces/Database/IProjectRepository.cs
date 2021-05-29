using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Core.Entities;

namespace WebAPI.Core.Interfaces.Database
{
    public interface IProjectRepository : IBaseCrudRepository<Project>
    {
        Task<List<Project>> GetProjectWithTeamsByWorkSpaceIdAsync(Guid workSpaceId);

        Task<List<Project>> GetProjectsByCollectionOfTeamIds(IEnumerable<Team> teams);

        Task<List<Project>> GetProjectsBySearchTerm(string term, int limit, Guid[] teamIds);
        
        Task DeleteSoftAsync(Guid projectId);
    }
}