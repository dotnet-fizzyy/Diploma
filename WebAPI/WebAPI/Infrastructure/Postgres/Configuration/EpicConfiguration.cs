using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class EpicConfiguration : IEntityTypeConfiguration<Epic>
    {
        public void Configure(EntityTypeBuilder<Epic> builder)
        {
            builder.HasKey(x => x.EpicId);
            builder
                .HasMany(x => x.Sprints)
                .WithOne(e => e.Epic);
            builder
                .HasMany(x => x.Teams)
                .WithOne(e => e.Epic);
        }
    }
}