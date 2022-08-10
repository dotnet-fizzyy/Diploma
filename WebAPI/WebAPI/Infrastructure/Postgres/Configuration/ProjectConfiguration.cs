using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class ProjectConfiguration : BaseEntityConfiguration<Project>, IEntityTypeConfiguration<Project>
    {
        public new void Configure(EntityTypeBuilder<Project> builder)
        {
            base.Configure(builder);
            
            builder.Property(prop => prop.Id).HasColumnName("ProjectId");
            
            builder
                .HasOne<WorkSpace>()
                .WithMany(workSpace => workSpace.Projects)
                .HasForeignKey(project => project.WorkSpaceId)
                .OnDelete(DeleteBehavior.SetNull);
            
            builder.HasIndex(prop => prop.WorkSpaceId);

            builder.HasQueryFilter(project => !project.IsDeleted);
        }
    }
}