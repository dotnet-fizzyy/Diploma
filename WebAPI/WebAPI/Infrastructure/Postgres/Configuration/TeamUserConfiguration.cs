using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class TeamUserConfiguration : IEntityTypeConfiguration<TeamUser>
    {
        public void Configure(EntityTypeBuilder<TeamUser> builder)
        {
            builder.HasKey(x => new { x.TeamId, x.UserId });
            builder
                .HasOne<Team>()
                .WithMany(e => e.TeamUsers)
                .HasForeignKey(x => x.TeamId);
            builder
                .HasOne<User>()
                .WithMany(e => e.TeamUsers)
                .HasForeignKey(x => x.UserId);
        }
    }
}