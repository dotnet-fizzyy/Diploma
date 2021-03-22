using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class ProjectConfiguration : IEntityTypeConfiguration<Project>
    {
        public void Configure(EntityTypeBuilder<Project> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("ProjectId");
            builder.Property(x => x.CreationDate).HasDefaultValue(DateTime.UtcNow.Date);
            builder
                .HasOne<WorkSpace>()
                .WithMany(x => x.Projects)
                .HasForeignKey(x => x.WorkSpaceId)
                .OnDelete(DeleteBehavior.SetNull);
            builder.HasIndex(x => x.WorkSpaceId);
        }
    }
}