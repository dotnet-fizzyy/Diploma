using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Database;

namespace WebAPI.Infrastructure.Postgres.Repository
{
    public class TeamRepository : BaseCrudRepository<DatabaseContext, Team>, ITeamRepository
    {
        public TeamRepository(DatabaseContext databaseContext) : base(databaseContext) { }
        
        public async Task<IEnumerable<Team>> GetUserTeams(Guid userId)
        {
            var userTeams = await _dbContext.Teams.Include(x => x.Users)
                .Where(x => x.Users.Any(t => t.UserId == userId)).ToListAsync();

            return userTeams;
        }
    }
}