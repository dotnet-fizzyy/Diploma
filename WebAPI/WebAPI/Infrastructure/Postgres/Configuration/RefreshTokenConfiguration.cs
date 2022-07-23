using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class RefreshTokenConfiguration : BaseEntityConfiguration<RefreshToken>, IEntityTypeConfiguration<RefreshToken>
    {
        public new void Configure(EntityTypeBuilder<RefreshToken> builder)
        {
            base.Configure(builder);
            
            builder.Property(prop => prop.Id).HasColumnName("RefreshTokenId");

            builder
                .HasOne<User>()
                .WithMany(user => user.RefreshTokens)
                .HasForeignKey(refreshToken => refreshToken.UserId)
                .OnDelete(DeleteBehavior.SetNull);
            
            builder.HasIndex(prop => prop.UserId);
        }
    }
}