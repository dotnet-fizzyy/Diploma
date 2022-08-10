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
        public SprintRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
            
        }

        public async Task<List<Sprint>> GetFullSprintsByEpicId(Guid epicId, Guid? teamId = null)
        {
            List<Sprint> sprintEntities;

            if (teamId.HasValue)
            {
                sprintEntities = await DbContext.Sprints
                    .Include(include => include.Stories)
                    .Where(sprint => sprint.EpicId == epicId)
                    .Select(sprint => FilterStoriesByTeam(sprint, (Guid)teamId))
                    .ToListAsync();
            }
            else
            {
                sprintEntities = await DbContext.Sprints
                    .Include(include => include.Stories)
                    .Where(sprint => sprint.EpicId == epicId)
                    .ToListAsync();   
            }
            
            return sprintEntities;
        }

        
        private static Sprint FilterStoriesByTeam(Sprint sprint, Guid teamId)
        {
            sprint.Stories = sprint.Stories.Where(story => story.TeamId == teamId).ToList();

            return sprint;
        }
    }
}