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
        public TeamRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
            
        }

        public async Task<Team> GetUserTeamById(Guid teamId, Guid userId)
        {
            var team = await DbContext.Teams
                    .AsNoTracking()
                    .Include(x => x.TeamUsers)
                    .ThenInclude(x => x.User)
                    .FirstOrDefaultAsync(x => x.Id == teamId && x.TeamUsers.Select(e => e.User).Any(e => e.Id == userId));

            return team;
        }

        public async Task<List<Team>> GetUserTeams(Guid userId)
        {
            var user = await DbContext.Users
                .AsNoTracking()
                .Include(x => x.TeamUsers)
                .ThenInclude(x => x.Team)
                .FirstOrDefaultAsync(x => x.Id == userId);

            return user.TeamUsers
                .Select(x => x.Team)
                .ToList();
        }

        public async Task<List<Team>> GetTeamsBySearchTerm(string searchTerm, int limit, Guid[] teamIds)
        {
            var query = from teams in DbContext.Teams
                    .AsNoTracking()
                    .Include(x => x.TeamUsers)
                    .ThenInclude(x => x.User)
                    .Where(x => EF.Functions.ILike(x.TeamName, $"{searchTerm}%"))
                    .Take(limit)
                where teamIds.Any(x => x == teams.Id)
                select teams;

            var teamEntities = await query.ToListAsync();

            return teamEntities;
        }

        public async Task<Team> GetTeamWithUsers(Guid teamId)
        {
            var team = await DbContext.Teams
                .AsNoTracking()
                .Include(x => x.TeamUsers)
                .ThenInclude(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == teamId);

            return team;
        }
    }
}