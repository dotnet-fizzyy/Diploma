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
        
        public async Task<List<Story>> GetStoriesByEpicId(Guid epicId)
        {
            var query = from sprints in _dbContext.Sprints
                join stories in _dbContext.Stories
                    on sprints.Id equals stories.SprintId
                    where sprints.EpicId == epicId select stories;

            var storiesFromEpic = await query.ToListAsync();
            
            return storiesFromEpic;
        }

        public async Task<List<Story>> GetStoriesByTitleTerm(string term, int limit, Guid workSpaceId)
        {
            var query = from stories in
                _dbContext.Stories.Where(
                    x => EF.Functions.Like(x.Title, $"%{term}%")
                ).AsNoTracking().Take(limit) 
                join sprints in _dbContext.Sprints on stories.SprintId equals sprints.Id
                join epic in _dbContext.Epics on sprints.EpicId equals epic.Id
                join project in _dbContext.Projects on epic.ProjectId equals project.Id
                where project.WorkSpaceId == workSpaceId
                select stories;


            var foundStories = await query.ToListAsync();

            return foundStories;
        }

        public async Task UpdateStoryColumn(Story story)
        {
            _dbContext.Stories.Attach(story);

            _dbContext.Entry(story).Property(x => x.ColumnType).IsModified = true;
            
            await _dbContext.SaveChangesAsync();
        }

        public async Task ChangeStoryStatus(Story story)
        {
            _dbContext.Attach(story);
            
            if (!string.IsNullOrEmpty(story.BlockReason))
            {
                _dbContext.Entry(story).Property(x => x.BlockReason).IsModified = true;
                _dbContext.Entry(story).Property(x => x.IsBlocked).IsModified = true;
            }
            else
            {
                _dbContext.Entry(story).Property(x => x.IsReady).IsModified = true;
            }
            
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteStorySoftAsync(Story story)
        {
            _dbContext.Attach(story);
            _dbContext.Entry(story).Property(x => x.IsDeleted).IsModified = true;

            await _dbContext.SaveChangesAsync();
        }
    }
}