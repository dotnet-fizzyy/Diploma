using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class EpicConfiguration : BaseEntityConfiguration<Epic>, IEntityTypeConfiguration<Epic>
    {
        public new void Configure(EntityTypeBuilder<Epic> builder)
        {
            base.Configure(builder);
            
            builder.Property(prop => prop.Id).HasColumnName("EpicId");

            builder
                .HasOne<Project>()
                .WithMany(project => project.Epics)
                .HasForeignKey(epic => epic.ProjectId)
                .OnDelete(DeleteBehavior.SetNull);

            builder.HasIndex(prop => prop.ProjectId);
            
            builder.HasQueryFilter(epic => !epic.IsDeleted);
        }
    }
}