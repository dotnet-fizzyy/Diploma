using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Core.Entities;

namespace WebAPI.Core.Interfaces.Database
{
    public interface ISprintRepository : IBaseCrudRepository<Sprint>
    {
        Task<List<Sprint>> GetSprintsBySprintNameTermAsync(string term, int limit, Guid workSpaceId);
        
        Task<List<Sprint>> GetFullSprintsByEpicId(Guid epicId);
        
        Task RemoveSprintSoftAsync(Guid sprintId);
    }
}