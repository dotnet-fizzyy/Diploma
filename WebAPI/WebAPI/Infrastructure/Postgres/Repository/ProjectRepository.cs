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
            var query = DbContext.Projects
                .Where(x => x.WorkSpaceId == workSpaceId)
                .Include(x => x.Teams);

            var foundProjects = await query.AsNoTracking().ToListAsync();

            return foundProjects;
        }

        public async Task<List<Project>> GetProjectsByCollectionOfTeamIds(IEnumerable<Team> teams)
        {
            var query = 
                from projects in DbContext.Projects 
                where teams.Select(x => x.ProjectId).Contains(projects.Id) 
                select projects;

            var foundProjects = await query.AsNoTracking().ToListAsync();

            return foundProjects;
        }

        public async Task<List<Project>> GetProjectsBySearchTerm(string term, int limit, Guid[] teamIds)
        {
            var query = from projects in DbContext.Projects
                    .AsNoTracking()
                    .Where(x => EF.Functions.ILike(x.ProjectName, $"{term}%"))
                join teams in DbContext.Teams on projects.Id equals teams.ProjectId
                where teamIds.Any(x => x == teams.Id)
                select projects;

            var projectEntities = await query.Distinct().ToListAsync();

            return projectEntities;
        }

        public async Task DeleteSoftAsync(Guid projectId)
        {
            var projectEntity = new Project
            {
                Id = projectId, 
                IsDeleted = true
            };

            DbContext.Entry(projectEntity).Property(x => x.IsDeleted).IsModified = true;

            await DbContext.SaveChangesAsync();
        }
    }
}