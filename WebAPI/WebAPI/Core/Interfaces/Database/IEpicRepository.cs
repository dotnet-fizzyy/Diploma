using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Core.Entities;

namespace WebAPI.Core.Interfaces.Database
{
    public interface IEpicRepository : IBaseCrudRepository<Epic>
    {
        Task<List<Epic>> GetEpicsByEpicNameTermAsync(string term, int limit, Guid workSpaceId);

        Task DeleteSoftAsync(Guid epicId);
    }
}