using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class SprintConfiguration : IEntityTypeConfiguration<Sprint>
    {
        public void Configure(EntityTypeBuilder<Sprint> builder)
        {
            builder.HasKey(x => x.SprintId);
            builder
                .HasMany(x => x.Stories)
                .WithOne(e => e.Sprint);
            builder
                .HasOne(x => x.Epic)
                .WithMany(e => e.Sprints);
        }
    }
}