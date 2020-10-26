using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces;

namespace WebAPI.Infrastructure.Postgres.Repository
{
    public class EpicRepository : BaseCrudRepository<DatabaseContext, Epic>, IEpicRepository
    {
        public EpicRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
            
        }
    }
}