using System;
using System.Collections.Generic;
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
            var userTeams = await _dbContext.Teams.Include(x => x.TeamUsers).ThenInclude(x => x.Team).ToListAsync();

            return userTeams;
        }
    }
}