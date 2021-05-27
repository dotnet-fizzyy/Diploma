using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Core.Entities;

namespace WebAPI.Core.Interfaces.Database
{
    public interface ISprintRepository : IBaseCrudRepository<Sprint>
    {
        Task<List<Sprint>> GetFullSprintsByEpicId(Guid epicId, Guid? teamId = null);
        
        Task DeleteSoftAsync(Guid sprintId);
    }
}