using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Database;

namespace WebAPI.Infrastructure.Postgres.Repository
{
    public class UserRepository : BaseCrudRepository<DatabaseContext, User>, IUserRepository
    {
        private readonly DatabaseContext _databaseContext;

        public UserRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
            _databaseContext = databaseContext;
        }
        public async Task<bool> AuthenticateUser(User user)
        {
            var existingUser = await _databaseContext.Users
                .FirstOrDefaultAsync(x => x.UserName == user.UserName && x.Password == user.Password);

            return existingUser != null;
        }
    }
}