using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class SprintConfiguration : BaseEntityConfiguration<Sprint>, IEntityTypeConfiguration<Sprint>
    {
        public new void Configure(EntityTypeBuilder<Sprint> builder)
        {
            base.Configure(builder);
            
            builder.Property(prop => prop.Id).HasColumnName("SprintId");
            
            builder
                .HasOne<Epic>()
                .WithMany(epic => epic.Sprints)
                .HasForeignKey(sprint => sprint.EpicId)
                .OnDelete(DeleteBehavior.SetNull);
            
            builder.HasIndex(prop => prop.EpicId);

            builder.HasQueryFilter(sprint => !sprint.IsDeleted);
        }
    }
}