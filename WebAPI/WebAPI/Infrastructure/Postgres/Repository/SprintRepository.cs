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
                teamId.HasValue 
                    ? await DbContext.Sprints
                        .Include(x => x.Stories)
                        .Where(x => x.EpicId == epicId)
                        .Select(x => FilterStoriesByTeam(x, (Guid)teamId))
                        .ToListAsync()
                    : await DbContext.Sprints
                        .Include(x => x.Stories)
                        .Where(x => x.EpicId == epicId)
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

            DbContext.Entry(sprintEntity).Property(x => x.IsDeleted).IsModified = true;
            
            await DbContext.SaveChangesAsync();
        }

        
        private static Sprint FilterStoriesByTeam(Sprint sprint, Guid teamId)
        {
            sprint.Stories = sprint.Stories.Where(s => s.TeamId == teamId).ToList();

            return sprint;
        }
    }
}