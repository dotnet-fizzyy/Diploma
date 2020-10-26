using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces;

namespace WebAPI.Infrastructure.Postgres.Repository
{
    public class StoryHistoryRepository : BaseCrudRepository<DatabaseContext, StoryHistory>, IStoryHistoryRepository
    {
        public StoryHistoryRepository(DatabaseContext databaseContext) : base(databaseContext) { }
    }
}