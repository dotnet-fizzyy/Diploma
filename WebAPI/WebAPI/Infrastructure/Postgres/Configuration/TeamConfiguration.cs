using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class TeamConfiguration : BaseEntityConfiguration<Team>, IEntityTypeConfiguration<Team>
    {
        public new void Configure(EntityTypeBuilder<Team> builder)
        {
            builder.Property(prop => prop.Id).HasColumnName("TeamId");
            
            builder
                .HasOne<Project>()
                .WithMany(project => project.Teams)
                .HasForeignKey(team => team.ProjectId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(required: false);
            
            builder.HasIndex(prop => prop.ProjectId);
            
            builder.HasQueryFilter(team => !team.IsDeleted);
        }
    }
}