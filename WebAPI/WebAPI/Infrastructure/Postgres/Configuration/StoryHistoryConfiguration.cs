using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class StoryHistoryConfiguration : IEntityTypeConfiguration<StoryHistory>
    {
        public void Configure(EntityTypeBuilder<StoryHistory> builder)
        {
            builder.HasKey(x => x.StoryHistoryId);
            builder
                .HasMany(x => x.Users)
                .WithOne(e => e.StoryHistory);
            builder
                .HasMany(x => x.Stories)
                .WithOne(e => e.StoryHistory);
        }
    }
}