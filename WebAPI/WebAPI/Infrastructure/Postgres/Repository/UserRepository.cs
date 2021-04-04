using System;
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
        
        public async Task<User> AuthenticateUser(User user)
        {
            return await _dbContext.Users
                .FirstOrDefaultAsync(x => x.UserName == user.UserName && x.Password == user.Password);
        }

        public async Task UpdateUserAvatarLinkAsync(User user)
        {
            _dbContext.Users.Attach(user);
            _dbContext.Entry(user).Property(x => x.AvatarLink).IsModified = true;

            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateUserPasswordAsync(User user)
        {
            _dbContext.Users.Attach(user);
            _dbContext.Entry(user).Property(x => x.Password).IsModified = true;

            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateUserWorkSpace(User user)
        {
            _dbContext.Users.Attach(user);
            _dbContext.Entry(user).Property(x => x.WorkSpaceId).IsModified = true;

            await _dbContext.SaveChangesAsync();
        }

        public async Task DeactivateUser(User user)
        {
            _dbContext.Users.Attach(user);
            _dbContext.Entry(user).Property(x => x.IsActive).IsModified = true;

            await _dbContext.SaveChangesAsync();
        }
    }
}