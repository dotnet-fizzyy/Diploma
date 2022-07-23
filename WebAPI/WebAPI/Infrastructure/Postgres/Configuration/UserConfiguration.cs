using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class UserConfiguration : BaseEntityConfiguration<User>, IEntityTypeConfiguration<User>
    {
        public new void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(prop => prop.Id).HasColumnName("UserId");
            
            builder
                .HasOne<WorkSpace>()
                .WithMany(workSpace => workSpace.Users)
                .HasForeignKey(user => user.WorkSpaceId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(required: false);

            builder.HasIndex(prop => prop.UserName);
            builder.HasIndex(prop => prop.Password);
            builder.HasIndex(prop => prop.UserRole);
            builder.HasIndex(prop => prop.UserPosition);
        }
    }
}