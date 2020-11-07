using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Database;

namespace WebAPI.Infrastructure.Postgres.Repository
{
    public class StoryHistoryRepository : BaseCrudRepository<DatabaseContext, StoryHistory>, IStoryHistoryRepository
    {
        private readonly DatabaseContext _databaseContext;

        public StoryHistoryRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
            _databaseContext = databaseContext;
        }
        
        public async Task DeleteStorySoft(Guid storyId)
        {
            var story =
                await _databaseContext.Stories.SingleOrDefaultAsync(x => x.StoryId == storyId);

            if (story != null)
            {
                story.IsDeleted = true;
            }

            await _databaseContext.SaveChangesAsync();
        }
    }
}