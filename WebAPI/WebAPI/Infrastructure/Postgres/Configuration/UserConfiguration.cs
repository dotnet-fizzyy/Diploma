using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.UserId);
            builder.Property(x => x.UserPosition).HasConversion(
                x => x.ToString(),
                x => (UserPosition)Enum.Parse(typeof(UserPosition), x)
                );
            builder.Property(x => x.UserRole).HasConversion(
                x => x.ToString(),
                x => (UserRole)Enum.Parse(typeof(UserRole), x)
                );
            builder
                .HasOne<Team>()
                .WithMany(e => e.Users)
                .HasForeignKey(x => x.TeamId)
                .OnDelete(DeleteBehavior.SetNull);
            builder.Property(x => x.RecordVersion)
                .HasColumnType("xid")
                .ValueGeneratedOnAddOrUpdate()
                .IsConcurrencyToken();
            builder.HasIndex(x => x.TeamId);
        }
    }
}