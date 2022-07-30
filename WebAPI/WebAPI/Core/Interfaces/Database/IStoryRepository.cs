using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Core.Entities;

namespace WebAPI.Core.Interfaces.Database
{
    public interface IStoryRepository : IBaseCrudRepository<Story>
    {
        Task<List<Story>> GetStoriesByEpicAndTeamIds(Guid epicId, Guid teamId);
    }
}