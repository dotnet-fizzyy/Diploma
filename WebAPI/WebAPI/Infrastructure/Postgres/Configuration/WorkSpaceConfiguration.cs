using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class WorkSpaceConfiguration : IEntityTypeConfiguration<WorkSpace>
    {
        public void Configure(EntityTypeBuilder<WorkSpace> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("WorkSpaceId");
            builder.Property(x => x.CreationDate).HasColumnType("timestamptz");
        }
    }
}