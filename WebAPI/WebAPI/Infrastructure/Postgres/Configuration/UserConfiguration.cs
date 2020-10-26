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
                .HasMany(x => x.RefreshTokens)
                .WithOne(e => e.User);

            builder
                .HasOne(x => x.Team)
                .WithMany(e => e.Users);
        }
    }
}