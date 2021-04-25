using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Core.Entities;

namespace WebAPI.Core.Interfaces.Database
{
    public interface IProjectRepository : IBaseCrudRepository<Project>
    {
        Task<List<Project>> GetProjectsByUserId(Guid userId);

        Task<List<Project>> GetProjectWithTeamsByWorkSpaceIdAsync(Guid workSpaceId);

        Task<List<Project>> GetProjectsByCollectionOfTeamIds(IEnumerable<Team> teams);
    }
}