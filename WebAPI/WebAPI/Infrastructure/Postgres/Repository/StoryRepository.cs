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
        public StoryRepository(DatabaseContext databaseContext) : base(databaseContext) { }
        
        public async Task<List<Story>> GetStoriesByEpicId(Guid epicId, Guid? teamId)
        {
            var query = teamId.HasValue ?
                from sprints in DbContext.Sprints
                join stories in DbContext.Stories on sprints.Id equals stories.SprintId
                where sprints.EpicId == epicId && stories.TeamId == teamId
                select stories 
                :
                from sprints in DbContext.Sprints
                join stories in DbContext.Stories on sprints.Id equals stories.SprintId
                where sprints.EpicId == epicId 
                select stories;

            var storiesFromEpic = await query.ToListAsync();
            
            return storiesFromEpic;
        }

        public async Task<List<Story>> GetStoriesByTitleTerm(string searchTerm, int limit, Guid[] teamIds)
        {
            var query = from stories in
                DbContext.Stories.Where(
                    x => EF.Functions.Like(x.Title, $"{searchTerm}%")
                ).AsNoTracking().Take(limit) 
                join sprints in DbContext.Sprints on stories.SprintId equals sprints.Id
                join epic in DbContext.Epics on sprints.EpicId equals epic.Id
                join project in DbContext.Projects on epic.ProjectId equals project.Id
                join teams in DbContext.Teams on project.Id equals teams.ProjectId
                where teamIds.Select(x => x).Any(x => x == teams.Id)
                select stories;
            
            var foundStories = await query.ToListAsync();

            return foundStories;
        }

        public async Task<Story> UpdateStoryColumn(Story story)
        {
            DbContext.Entry(story).Property(x => x.ColumnType).IsModified = true;
            
            await DbContext.SaveChangesAsync();
            
            return story;
        }

        public async Task ChangeStoryStatus(Story story)
        {
            if (!string.IsNullOrEmpty(story.BlockReason))
            {
                DbContext.Entry(story).Property(x => x.BlockReason).IsModified = true;
                DbContext.Entry(story).Property(x => x.IsBlocked).IsModified = true;
            }
            else
            {
                DbContext.Entry(story).Property(x => x.IsReady).IsModified = true;
            }
            
            await DbContext.SaveChangesAsync();
        }

        public async Task DeleteStorySoftAsync(Story story)
        {
            DbContext.Entry(story).Property(x => x.IsDeleted).IsModified = true;

            await DbContext.SaveChangesAsync();
        }
    }
}