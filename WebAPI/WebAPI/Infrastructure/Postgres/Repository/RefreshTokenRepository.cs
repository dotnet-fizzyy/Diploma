using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Database;

namespace WebAPI.Infrastructure.Postgres.Repository
{
    public class RefreshTokenRepository : BaseCrudRepository<DatabaseContext, RefreshToken>, IRefreshTokenRepository
    {
        public RefreshTokenRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
            
        }
    }
}