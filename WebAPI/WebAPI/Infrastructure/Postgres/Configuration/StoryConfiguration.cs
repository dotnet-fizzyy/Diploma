using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class StoryConfiguration : IEntityTypeConfiguration<Story>
    {
        public void Configure(EntityTypeBuilder<Story> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("StoryId");
            builder.Property(x => x.CreationDate).HasColumnType("timestamptz");
            builder
                .HasOne<Sprint>()
                .WithMany(x => x.Stories)
                .HasForeignKey(x => x.SprintId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(false);
            builder
                .HasOne<User>()
                .WithMany(e => e.Stories)
                .HasForeignKey(x => x.UserId)
                .IsRequired(false);
            builder
                .HasOne<Team>()
                .WithMany(x => x.Stories)
                .HasForeignKey(x => x.TeamId)
                .IsRequired(false);
            builder.Property(x => x.RecordVersion)
                .HasColumnName("xmin")
                .HasColumnType("xid")
                .ValueGeneratedOnAddOrUpdate()
                .IsConcurrencyToken();
            builder.HasQueryFilter(x => !x.IsDeleted);
            builder.HasIndex(x => x.Title);
            builder.HasIndex(x => x.SprintId);
            builder.HasIndex(x => x.ColumnType);
        }
    }
}