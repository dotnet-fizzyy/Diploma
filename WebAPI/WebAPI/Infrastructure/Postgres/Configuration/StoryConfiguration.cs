using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;

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
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(false);
            builder
                .HasOne<User>()
                .WithMany(e => e.Stories)
                .HasForeignKey(x => x.UserId)
                .IsRequired(false);
            builder.Property(x => x.RecordVersion)
                .HasColumnName("xmin")
                .HasColumnType("xid")
                .ValueGeneratedOnAddOrUpdate()
                .IsConcurrencyToken();
            builder.HasIndex(x => x.SprintId);
            builder.HasIndex(x => x.UserId);
            builder.HasIndex(x => x.ColumnType);
        }
    }
}