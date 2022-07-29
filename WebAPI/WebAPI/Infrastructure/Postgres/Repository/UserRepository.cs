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

        public async Task<User> AuthenticateUser(string email, string password) =>
            await DbContext.Users
                .AsNoTracking()
                .Include(include => include.TeamUsers)
                .FirstOrDefaultAsync(user => user.Email == email &&
                                             user.Password == password &&
                                             user.IsActive);
    }
}