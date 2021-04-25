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
        
        public async Task<List<Team>> GetUserTeams(Guid userId)
        {
            var user = await _dbContext.Users
                .AsNoTracking()
                .Include(x => x.TeamUsers)
                .ThenInclude(x => x.Team)
                .FirstOrDefaultAsync(x => x.Id == userId);

            return user.TeamUsers
                .Select(x => x.Team)
                .ToList();
        }
    }
}