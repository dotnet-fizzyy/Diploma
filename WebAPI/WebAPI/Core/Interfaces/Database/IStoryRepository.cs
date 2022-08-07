using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;

namespace WebAPI.Core.Interfaces.Database
{
    public interface IStoryRepository : IBaseCrudRepository<Story>
    {
        Task<List<Story>> GetStoriesByEpicAndTeamIds(Guid epicId, Guid teamId);

        Task<List<Story>> SearchForStories(
            Guid? epicId,
            Guid? sprintId,
            Guid? teamId,
            string sortField,
            SortDirection sortDirection);
    }
}