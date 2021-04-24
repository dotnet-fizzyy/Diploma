using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).HasColumnName("UserId");
            builder.Property(x => x.CreationDate).HasColumnType("timestamptz");
            builder
                .HasOne<WorkSpace>()
                .WithMany(e => e.Users)
                .HasForeignKey(x => x.WorkSpaceId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(false);
            builder.HasIndex(x => x.UserName);
            builder.HasIndex(x => x.Password);
            builder.HasIndex(x => x.UserRole);
            builder.HasIndex(x => x.UserPosition);
        }
    }
}