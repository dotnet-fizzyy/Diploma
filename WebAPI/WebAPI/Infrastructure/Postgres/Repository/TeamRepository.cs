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

        public async Task<Team> GetUserTeamById(Guid teamId, Guid userId) =>
            await DbContext.Teams
                .AsNoTracking()
                .Include(team => team.TeamUsers)
                .ThenInclude(teamUser => teamUser.User)
                .FirstOrDefaultAsync(team => team.Id == teamId && 
                                             team.TeamUsers
                                                 .Select(teamUser => teamUser.User)
                                                 .Any(user => user.Id == userId));

        public async Task<List<Team>> GetUserTeams(Guid userId)
        {
            var user = await DbContext.Users
                .AsNoTracking()
                .Include(user => user.TeamUsers)
                .ThenInclude(teamUser => teamUser.Team)
                .SingleOrDefaultAsync(user => user.Id == userId);

            if (user?.TeamUsers == null)
            {
                return new List<Team>();
            }


            return user.TeamUsers
                .Select(teamUser => teamUser.Team)
                .ToList();
        }

        // todo: pass more params like projectIds, workspaceId
        public async Task<List<Team>> GetTeamsBySearchTerm(
            string searchTerm,
            int limit,
            int offset,
            IEnumerable<Guid> projectIds,
            IEnumerable<Guid> teamIds)
        {
            var query = 
                from team in DbContext.Teams
                join project in DbContext.Projects on team.ProjectId equals project.Id
                where EF.Functions.ILike(team.TeamName, $"{searchTerm}%") &&
                      projectIds.Any(projectId => projectId == project.Id) &&
                      teamIds.Any(teamId => teamId == team.Id)
                select team;

            return await query
                .Skip(offset)
                .Take(limit)
                .ToListAsync();
        }

        public async Task<Team> GetTeamWithUsers(Guid teamId) =>
            await DbContext.Teams
                .AsNoTracking()
                .Include(team => team.TeamUsers)
                .ThenInclude(teamUser => teamUser.User)
                .SingleOrDefaultAsync(team => team.Id == teamId);
    }
}