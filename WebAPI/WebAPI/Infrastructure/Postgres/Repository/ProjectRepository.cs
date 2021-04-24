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

        public async Task<List<Project>> GetProjectsByUserId(Guid userId)
        {
            var query = from users in _dbContext.Users
                join teams in _dbContext.Teams on users.TeamUserId equals teams.Id
                join projects in _dbContext.Projects.Include(x => x.Teams)
                    on teams.ProjectId equals projects.Id
                where users.Id == userId
                select projects; 

            var foundProjects = await query.ToListAsync();

            return foundProjects;
        }

        public async Task<List<Project>> GetProjectWithTeamsByWorkSpaceIdAsync(Guid workSpaceId)
        {
            var query = _dbContext.Projects.Where(x => x.WorkSpaceId == workSpaceId).Include(x => x.Teams);

            var foundProjects = await query.ToListAsync();

            return foundProjects;
        }
    }
}