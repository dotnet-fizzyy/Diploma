using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Database;

namespace WebAPI.Infrastructure.Postgres.Repository
{
    public class TeamUserRepository : BaseCrudRepository<DatabaseContext, TeamUser>, ITeamUserRepository
    {
        public TeamUserRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
            
        }
    }
}