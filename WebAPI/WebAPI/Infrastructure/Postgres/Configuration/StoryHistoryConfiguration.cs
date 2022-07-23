using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class StoryHistoryConfiguration : BaseEntityConfiguration<StoryHistory>, IEntityTypeConfiguration<StoryHistory>
    {
        public new void Configure(EntityTypeBuilder<StoryHistory> builder)
        {
            base.Configure(builder);

            builder.Property(x => x.Id).HasColumnName("StoryHistoryId");
            
            builder
                .HasOne<Story>()
                .WithMany(story => story.StoryHistories)
                .HasForeignKey(storyHistory => storyHistory.StoryId)
                .OnDelete(DeleteBehavior.SetNull);
            
            builder.HasIndex(prop => prop.StoryId);
        }
    }
}