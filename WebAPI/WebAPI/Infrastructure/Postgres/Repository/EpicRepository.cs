using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Database;

namespace WebAPI.Infrastructure.Postgres.Repository
{
    public class EpicRepository : BaseCrudRepository<DatabaseContext, Epic>, IEpicRepository
    {
        public EpicRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
            
        }

        public async Task<List<Epic>> GetEpicsByEpicNameTermAsync(string term, int limit, Guid workSpaceId)
        {
            var query =
                from epics in _dbContext.Epics
                    .Where(x => EF.Functions.Like(x.EpicName, $"%{term}%"))
                    .AsNoTracking()
                    .Take(limit)
                join projects in _dbContext.Projects on epics.ProjectId equals projects.Id
                where projects.WorkSpaceId == workSpaceId
                select epics;

            var epicEntities = await query.ToListAsync();

            return epicEntities;
        }
    }
}