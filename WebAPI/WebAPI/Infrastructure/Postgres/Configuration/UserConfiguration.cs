using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.UserId);
            builder
                .HasOne<Team>()
                .WithMany(e => e.Users)
                .HasForeignKey(x => x.TeamId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(false);
            builder.Property(x => x.RecordVersion)
                .HasColumnName("xmin")
                .HasColumnType("xid")
                .ValueGeneratedOnAddOrUpdate()
                .IsConcurrencyToken();
            builder.HasIndex(x => x.TeamId);
            builder.HasIndex(x => x.UserName);
            builder.HasIndex(x => x.Password);
            builder.HasIndex(x => x.UserRole);
            builder.HasIndex(x => x.UserPosition);
        }
    }
}