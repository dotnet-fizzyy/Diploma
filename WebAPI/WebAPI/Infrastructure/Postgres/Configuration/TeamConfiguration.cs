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
                .HasOne<Project>()
                .WithMany(e => e.Teams)
                .HasForeignKey(x => x.ProjectId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(false);
            builder.HasIndex(x => x.ProjectId);
        }
    }
}