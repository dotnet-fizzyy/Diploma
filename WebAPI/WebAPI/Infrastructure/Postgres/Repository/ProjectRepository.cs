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

        public async Task<List<Project>> GetProjectsByUserId(Guid userId, bool includeChildren)
        {
            var query = includeChildren
                ? from users in _dbContext.Users
                join teams in _dbContext.Teams on users.TeamId equals teams.Id
                join projects in _dbContext.Projects.Include(x => x.Teams)
                    on teams.ProjectId equals projects.Id
                where users.Id == userId
                select projects
                : from projects in _dbContext.Projects where projects.Customer == userId.ToString()
                select projects; 

            var foundProjects = await query.ToListAsync();

            return foundProjects;
        }
    }
}