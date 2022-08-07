using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class StoryConfiguration : BaseEntityConfiguration<Story>, IEntityTypeConfiguration<Story>
    {
        public new void Configure(EntityTypeBuilder<Story> builder)
        {
            base.Configure(builder);
            
            builder.Property(prop => prop.Id).HasColumnName("StoryId");

            builder
                .HasOne<Sprint>()
                .WithMany(sprint => sprint.Stories)
                .HasForeignKey(story => story.SprintId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(required: false);

            builder
                .HasOne<User>()
                .WithMany(user => user.Stories)
                .HasForeignKey(story => story.UserId)
                .IsRequired(required: false);

            builder
                .HasOne<Team>()
                .WithMany(team => team.Stories)
                .HasForeignKey(story => story.TeamId)
                .IsRequired(required: false);

            builder.Property(prop => prop.RecordVersion)
                .HasColumnName("xmin")
                .HasColumnType("xid")
                .ValueGeneratedOnAddOrUpdate()
                .IsConcurrencyToken();

            builder.HasIndex(prop => prop.Title);
            builder.HasIndex(prop => prop.SprintId);
            builder.HasIndex(prop => prop.ColumnType);
            
            builder.HasQueryFilter(story => !story.IsDeleted);
        }
    }
}