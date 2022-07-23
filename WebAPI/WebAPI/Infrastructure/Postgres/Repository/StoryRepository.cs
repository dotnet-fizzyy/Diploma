using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Database;

namespace WebAPI.Infrastructure.Postgres.Repository
{
    public class StoryRepository : BaseCrudRepository<DatabaseContext, Story>, IStoryRepository
    {
        public StoryRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
            
        }
        
        public async Task<List<Story>> GetStoriesByEpicAndTeamIds(Guid epicId, Guid? teamId)
        {
            IQueryable<Story> query;

            if (teamId.HasValue)
            {
                query = 
                    from sprints in DbContext.Sprints
                    join stories in DbContext.Stories on sprints.Id equals stories.SprintId
                    where sprints.EpicId == epicId && stories.TeamId == teamId
                    select stories;
            }
            else
            {
                query = 
                    from sprints in DbContext.Sprints
                    join stories in DbContext.Stories on sprints.Id equals stories.SprintId
                    where sprints.EpicId == epicId 
                    select stories;
            }

            var storiesFromEpic = await query.ToListAsync();
            
            return storiesFromEpic;
        }

        public void SoftRemove(Guid id)
        {
            var storyToRemove = new Story
            {
                Id = id,
                IsDeleted = true,
            };

            DbContext.Entry(storyToRemove).Property(prop => prop.IsDeleted).IsModified = true;
        }
    }
}