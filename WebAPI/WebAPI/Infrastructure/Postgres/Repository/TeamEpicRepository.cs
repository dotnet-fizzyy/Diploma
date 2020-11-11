using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Database;

namespace WebAPI.Infrastructure.Postgres.Repository
{
    public class TeamEpicRepository : BaseCrudRepository<DatabaseContext, TeamEpic>, ITeamEpicRepository
    {
        public TeamEpicRepository(DatabaseContext databaseContext) : base(databaseContext) { }
    }
}