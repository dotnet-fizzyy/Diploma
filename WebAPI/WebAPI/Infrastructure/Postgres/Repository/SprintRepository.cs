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

        public async Task<List<Sprint>> GetFullSprintsByEpicId(Guid epicId, Guid? teamId = null)
        {
            var sprintEntities =
                await _dbContext.Sprints
                    .Include(x => x.Stories)
                    .Where(x => x.EpicId == epicId && x.Stories.Any(s => !teamId.HasValue || s.TeamId == teamId))
                    .ToListAsync();

            return sprintEntities;
        }

        public async Task DeleteSoftAsync(Guid sprintId)
        {
            var sprintEntity = new Sprint
            {
                Id = sprintId,
                IsDeleted = true
            };

            _dbContext.Entry(sprintEntity).Property(x => x.IsDeleted).IsModified = true;
            
            await _dbContext.SaveChangesAsync();
        }
    }
}