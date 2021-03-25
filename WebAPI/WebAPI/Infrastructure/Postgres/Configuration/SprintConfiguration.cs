using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class SprintConfiguration : IEntityTypeConfiguration<Sprint>
    {
        public void Configure(EntityTypeBuilder<Sprint> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("SprintId");
            builder.Property(x => x.CreationDate).HasColumnType("timestamptz");
            builder
                .HasOne<Epic>()
                .WithMany(e => e.Sprints)
                .HasForeignKey(x => x.EpicId)
                .OnDelete(DeleteBehavior.SetNull);
            builder.HasIndex(x => x.EpicId);
        }
    }
}