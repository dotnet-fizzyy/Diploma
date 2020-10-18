using Microsoft.EntityFrameworkCore;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Epic> Epics { get; set; }
        public DbSet<Sprint> Sprints { get; set; }
        public DbSet<Story> Stories { get; set; }
        public DbSet<StoryHistory> StoryHistories { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("");
        }
    }
}