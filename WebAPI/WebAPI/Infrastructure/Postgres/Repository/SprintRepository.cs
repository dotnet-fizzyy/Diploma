using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Database;

namespace WebAPI.Infrastructure.Postgres.Repository
{
    public class SprintRepository : BaseCrudRepository<DatabaseContext, Sprint>, ISprintRepository
    {
        public SprintRepository(DatabaseContext databaseContext) : base(databaseContext) { }

        public async Task<List<Sprint>> GetSprintsBySprintNameTermAsync(string term, int limit, Guid workSpaceId)
        {
            var query =
                from sprints in _dbContext.Sprints.Where(x => EF.Functions.Like(x.SprintName, $"%{term}%"))
                    .AsNoTracking().Take(limit)
                join epics in _dbContext.Epics on sprints.EpicId equals epics.Id
                join projects in _dbContext.Projects on epics.ProjectId equals projects.Id
                where projects.Id == workSpaceId
                select sprints;

            var sprintEntities = await query.ToListAsync();

            return sprintEntities;
        }

        public async Task<List<Sprint>> GetFullSprintsByEpicId(Guid epicId)
        {
            var sprintEntities =
                await _dbContext.Sprints
                    .Where(x => x.EpicId == epicId)
                    .Include(x => x.Stories)
                    .ToListAsync();

            return sprintEntities;
        }
    }
}