using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces;

namespace WebAPI.Infrastructure.Postgres.Repository
{
    public class UserRepository : BaseCrudRepository<DatabaseContext, User>, IUserRepository
    {
        public UserRepository(DatabaseContext databaseContext) : base(databaseContext) { }
    }
}