using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class TeamConfiguration : IEntityTypeConfiguration<Team>
    {
        public void Configure(EntityTypeBuilder<Team> builder)
        {
            builder.HasKey(x => x.TeamId);
            builder
                .HasMany(x => x.Users)
                .WithOne(e => e.Team);
            builder
                .HasOne(x => x.Project)
                .WithMany(e => e.Teams);
            builder
                .HasOne(x => x.Epic)
                .WithMany(e => e.Teams);
        }
    }
}