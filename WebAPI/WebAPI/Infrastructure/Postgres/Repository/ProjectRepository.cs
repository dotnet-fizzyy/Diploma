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
        public ProjectRepository(DatabaseContext databaseContext) : base(databaseContext) { }

        public async Task<List<Project>> GetProjectWithTeamsByWorkSpaceIdAsync(Guid workSpaceId)
        {
            var query = _dbContext.Projects
                .Where(x => x.WorkSpaceId == workSpaceId)
                .Include(x => x.Teams);

            var foundProjects = await query.AsNoTracking().ToListAsync();

            return foundProjects;
        }

        public async Task<List<Project>> GetProjectsByCollectionOfTeamIds(IEnumerable<Team> teams)
        {
            var query = 
                from projects in _dbContext.Projects 
                where teams.Select(x => x.ProjectId).Contains(projects.Id) 
                select projects;

            var foundProjects = await query.AsNoTracking().ToListAsync();

            return foundProjects;
        }
    }
}