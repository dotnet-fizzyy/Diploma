using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class WorkSpaceConfiguration : BaseEntityConfiguration<WorkSpace>, IEntityTypeConfiguration<WorkSpace>
    {
        public new void Configure(EntityTypeBuilder<WorkSpace> builder)
        {
            base.Configure(builder);
            
            builder.Property(x => x.Id).HasColumnName("WorkSpaceId");
        }
    }
}