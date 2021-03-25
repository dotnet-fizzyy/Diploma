using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class WorkSpaceConfiguration : IEntityTypeConfiguration<WorkSpace>
    {
        public void Configure(EntityTypeBuilder<WorkSpace> builder)
        {
            builder.HasKey(x => x.Id).HasName("WorkSpaceId");
            builder.Property(x => x.CreationDate).HasColumnType("timestamptz");
        }
    }
}