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
        
        public async Task<List<Sprint>> GetFullSprintsByEpicId(Guid epicId)
        {
            var query = from sprints in _dbContext.Sprints.Include(x => x.Stories)
                join epics in _dbContext.Epics on sprints.EpicId equals epics.EpicId
                select sprints;

            var sprintEntities = await query.ToListAsync();

            return sprintEntities;
        }
    }
}