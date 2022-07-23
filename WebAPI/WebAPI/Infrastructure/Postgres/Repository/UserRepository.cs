using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Database;

namespace WebAPI.Infrastructure.Postgres.Repository
{
    public class UserRepository : BaseCrudRepository<DatabaseContext, User>, IUserRepository
    {
        public UserRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }

        public async Task<User> AuthenticateUser(User authUser) =>
            await DbContext.Users
                .AsNoTracking()
                .Include(include => include.TeamUsers)
                .FirstOrDefaultAsync(user => user.Email == authUser.Email &&
                                             user.Password == authUser.Password &&
                                             user.IsActive);

        public async Task UpdateUserAvatarLinkAsync(User user)
        {
            DbContext.Users.Attach(user);
            DbContext.Entry(user).Property(x => x.AvatarLink).IsModified = true;

            await DbContext.SaveChangesAsync();
        }

        public async Task UpdateUserPasswordAsync(User user)
        {
            DbContext.Users.Attach(user);
            DbContext.Entry(user).Property(x => x.Password).IsModified = true;

            await DbContext.SaveChangesAsync();
        }

        public async Task UpdateUserWorkSpace(User user)
        {
            DbContext.Users.Attach(user);
            DbContext.Entry(user).Property(x => x.WorkSpaceId).IsModified = true;

            await DbContext.SaveChangesAsync();
        }

        public async Task ChangeUserActivityStatusAsync(User user)
        {
            DbContext.Users.Attach(user);
            DbContext.Entry(user).Property(x => x.IsActive).IsModified = true;

            await DbContext.SaveChangesAsync();
        }
    }
}