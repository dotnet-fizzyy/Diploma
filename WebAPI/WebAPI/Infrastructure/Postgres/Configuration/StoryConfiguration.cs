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
                .HasOne<Sprint>()
                .WithMany(x => x.Stories)
                .HasForeignKey(x => x.SprintId)
                .OnDelete(DeleteBehavior.SetNull);
            builder
                .HasOne<User>()
                .WithMany(e => e.Stories)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.SetNull);
            builder.Property(x => x.RecordVersion)
                .HasColumnType("xid")
                .ValueGeneratedOnAddOrUpdate()
                .IsConcurrencyToken();
            builder.HasIndex(x => x.SprintId);
            builder.HasIndex(x => x.UserId);
        }
    }
}