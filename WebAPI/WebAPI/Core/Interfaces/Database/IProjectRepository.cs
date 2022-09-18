using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Core.Entities;

namespace WebAPI.Core.Interfaces.Database
{
    public interface IProjectRepository : IBaseCrudRepository<Project>
    {
        Task<List<Project>> SearchAsync(
            Guid workspaceId,
            string searchTerm,
            int limit,
            int offset);
        
        Task<List<Project>> GetProjectsBySearchTerm(
            string term,
            int limit,
            int offset,
            IEnumerable<Guid> teamIds);
    }
}