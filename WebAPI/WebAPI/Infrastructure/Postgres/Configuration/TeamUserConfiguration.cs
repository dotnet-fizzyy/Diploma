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
                .HasOne(x => x.Team)
                .WithMany(e => e.TeamUsers)
                .HasForeignKey(x => x.TeamId);
            builder
                .HasOne(x => x.User)
                .WithMany(e => e.TeamUsers)
                .HasForeignKey(x => x.UserId);
        }
    }
}