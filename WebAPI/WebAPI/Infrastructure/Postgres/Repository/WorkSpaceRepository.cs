using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Database;

namespace WebAPI.Infrastructure.Postgres.Repository
{
    public class WorkSpaceRepository : BaseCrudRepository<DatabaseContext, WorkSpace>, IWorkSpaceRepository
    {
        public WorkSpaceRepository(DatabaseContext dbContext) : base(dbContext) { }
        
        
        public async Task<WorkSpace> GetUserWorkSpaceAsync(Guid userId)
        {
            var query =
                from users in DbContext.Users
                join workspaces in DbContext.WorkSpaces
                    on users.WorkSpaceId equals workspaces.Id
                where users.Id == userId select workspaces;

            var workSpaceEntities = await query.ToListAsync();

            return workSpaceEntities.FirstOrDefault();
        }
    }
}