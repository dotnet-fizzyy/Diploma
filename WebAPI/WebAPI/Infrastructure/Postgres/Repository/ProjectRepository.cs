using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Database;

namespace WebAPI.Infrastructure.Postgres.Repository
{
    public class ProjectRepository : BaseCrudRepository<DatabaseContext, Project>, IProjectRepository
    {
        public ProjectRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
            
        }

        // todo: pass more params like workSpaceId
        public async Task<List<Project>> GetProjectsBySearchTerm(
            string term,
            int limit,
            int offset,
            IEnumerable<Guid> teamIds)
        {
            var query =
                from project in DbContext.Projects
                join team in DbContext.Teams on project.Id equals team.ProjectId
                where EF.Functions.ILike(project.ProjectName, $"{term}%") && 
                      teamIds.Any(teamId => teamId == team.Id)
                select project;

            return await query
                .Skip(offset)
                .Take(limit)
                .ToListAsync();
        }
    }
}