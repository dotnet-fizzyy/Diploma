using Microsoft.EntityFrameworkCore;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            
        }

        public DbSet<WorkSpace> WorkSpaces { get; set; } 
            
        public DbSet<Project> Projects { get; set; }

        public DbSet<Sprint> Sprints { get; set; }
        
        public DbSet<Story> Stories { get; set; }

        public DbSet<User> Users { get; set; }
        
        public DbSet<Team> Teams { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(DatabaseContext).Assembly);
        }
    }
}