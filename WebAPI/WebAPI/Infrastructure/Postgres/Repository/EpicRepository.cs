using System;
using System.Threading.Tasks;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Database;

namespace WebAPI.Infrastructure.Postgres.Repository
{
    public class EpicRepository : BaseCrudRepository<DatabaseContext, Epic>, IEpicRepository
    {
        public EpicRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
            
        }

        public async Task DeleteSoftAsync(Guid epicId)
        {
            var epicEntity = new Epic
            {
                Id = epicId,
                IsDeleted = true
            };

            DbContext.Entry(epicEntity).Property(x => x.IsDeleted).IsModified = true;
            
            await DbContext.SaveChangesAsync();
        }
    }
}