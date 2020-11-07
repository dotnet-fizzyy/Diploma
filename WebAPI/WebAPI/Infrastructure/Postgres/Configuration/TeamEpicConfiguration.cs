using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class TeamEpicConfiguration : IEntityTypeConfiguration<TeamEpic>
    {
        public void Configure(EntityTypeBuilder<TeamEpic> builder)
        {
            builder.HasKey(x => x.TeamEpicId);
            builder
                .HasOne<Team>()
                .WithMany(e => e.TeamEpics)
                .HasForeignKey(x => x.TeamId)
                .OnDelete(DeleteBehavior.SetNull);
            builder.HasOne<Epic>()
                .WithMany(e => e.TeamEpics)
                .HasForeignKey(x => x.EpicId)
                .OnDelete(DeleteBehavior.SetNull);
            builder.HasIndex(x => x.TeamId);
            builder.HasIndex(x => x.EpicId);
        }
    }
}