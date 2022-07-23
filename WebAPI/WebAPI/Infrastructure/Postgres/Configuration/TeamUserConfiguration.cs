using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPI.Core.Entities;

namespace WebAPI.Infrastructure.Postgres.Configuration
{
    public class TeamUserConfiguration : IEntityTypeConfiguration<TeamUser>
    {
        public void Configure(EntityTypeBuilder<TeamUser> builder)
        {
            builder.HasKey(teamUser => new { teamUser.TeamId, teamUser.UserId });

            builder
                .HasOne(teamUser => teamUser.Team)
                .WithMany(team => team.TeamUsers)
                .HasForeignKey(teamUser => teamUser.TeamId);
            
            builder
                .HasOne(teamUser => teamUser.User)
                .WithMany(user => user.TeamUsers)
                .HasForeignKey(teamUser => teamUser.UserId);
        }
    }
}