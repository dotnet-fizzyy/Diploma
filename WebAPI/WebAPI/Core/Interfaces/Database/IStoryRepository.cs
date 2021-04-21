using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Core.Entities;

namespace WebAPI.Core.Interfaces.Database
{
    public interface IStoryRepository : IBaseCrudRepository<Story>
    {
        Task<List<Story>> GetStoriesByEpicId(Guid epicId);

        Task<List<Story>> GetStoriesByTitleTerm(string term, int limit, Guid workSpaceId);

        Task UpdateStoryColumn(Story story);
        
        Task ChangeStoryStatus(Story story);
    }
}