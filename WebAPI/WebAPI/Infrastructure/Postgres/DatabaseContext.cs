using Microsoft.EntityFrameworkCore;
using WebAPI.Core.Entities;
using WebAPI.Infrastructure.Postgres.Configuration;

namespace WebAPI.Infrastructure.Postgres
{
    public class DatabaseContext : DbContext
    {
        public DbSet<WorkSpace> WorkSpaces { get; set; } 
            
        public DbSet<Project> Projects { get; set; }
        
        public DbSet<Epic> Epics { get; set; }
        
        public DbSet<Sprint> Sprints { get; set; }
        
        public DbSet<Story> Stories { get; set; }
        
        public DbSet<StoryHistory> StoryHistories { get; set; }
        
        public DbSet<User> Users { get; set; }
        
        public DbSet<Team> Teams { get; set; }
        
        public DbSet<TeamUser> TeamUser { get; set; }
        
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new RefreshTokenConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new TeamConfiguration());
            modelBuilder.ApplyConfiguration(new EpicConfiguration());
            modelBuilder.ApplyConfiguration(new SprintConfiguration());
            modelBuilder.ApplyConfiguration(new StoryConfiguration());
            modelBuilder.ApplyConfiguration(new StoryHistoryConfiguration());
            modelBuilder.ApplyConfiguration(new ProjectConfiguration());
            modelBuilder.ApplyConfiguration(new WorkSpaceConfiguration());
            modelBuilder.ApplyConfiguration(new TeamUserConfiguration());
        }
    }
}