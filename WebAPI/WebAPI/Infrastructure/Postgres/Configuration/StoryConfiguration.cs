using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class StoryConfiguration : IEntityTypeConfiguration<Story>
    {
        public void Configure(EntityTypeBuilder<Story> builder)
        {
            builder.HasKey(x => x.StoryId);
            builder
                .HasOne(x => x.User)
                .WithMany(x => x.Stories);
            builder
                .HasOne(x => x.Sprint)
                .WithMany(e => e.Stories);
            builder
                .HasOne(x => x.StoryHistory)
                .WithMany(e => e.Stories);
        }
    }
}