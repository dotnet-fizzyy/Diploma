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

        public async Task<List<Team>> SearchAsync(
            Guid workspaceId,
            string searchTerm,
            int limit,
            int offset
        )
        {
            var joiningQuery =
                DbContext.Teams
                    .Join(
                        DbContext.TeamUsers,
                        team => team.Id,
                        teamUser => teamUser.TeamId,
                        (team, teamUser) => new { team, teamUser })
                    .Join(
                        DbContext.Users,
                        teamsWithTeamUsers => teamsWithTeamUsers.teamUser.UserId,
                        user => user.Id,
                        (teamsWithTeamUsers, user) => new { teamsWithTeamUsers.team, user });

            if (string.IsNullOrWhiteSpace(searchTerm))
            {
                joiningQuery = joiningQuery.Where(teamWithUser => teamWithUser.user.WorkSpaceId == workspaceId);
            }
            else
            {
                joiningQuery = joiningQuery.Where(teamWithUser => EF.Functions.ILike(teamWithUser.team.TeamName, $"{searchTerm}%") &&
                                                                  teamWithUser.user.WorkSpaceId == workspaceId);
            }
            
            var teamsQuery = joiningQuery
                .Skip(offset)
                .Take(limit)
                .Select(teamWithUser => teamWithUser.team)
                .AsNoTracking();
            
            return await teamsQuery.ToListAsync();
        }

        [Obsolete("This overloading is obsolete and should be removed later")]
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