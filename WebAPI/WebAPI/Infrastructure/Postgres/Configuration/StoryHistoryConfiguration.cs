using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class StoryHistoryConfiguration : IEntityTypeConfiguration<StoryHistory>
    {
        public void Configure(EntityTypeBuilder<StoryHistory> builder)
        {
            builder.HasKey(x => x.StoryHistoryId);
            builder
                .HasOne<Story>()
                .WithMany(e => e.StoryHistories)
                .HasForeignKey(x => x.StoryId)
                .OnDelete(DeleteBehavior.SetNull);
            builder.Property(x => x.RecordVersion)
                .HasColumnName("xmin")
                .HasColumnType("xid")
                .ValueGeneratedOnAddOrUpdate()
                .IsConcurrencyToken();
            builder.HasIndex(x => x.StoryId);
        }
    }
}