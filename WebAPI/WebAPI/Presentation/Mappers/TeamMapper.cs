using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;

namespace WebAPI.Presentation.Mappers
{
    public class TeamMapper : ITeamMapper
    {
        public Team MapToEntity(Models.Models.Team team)
        {
            var teamEntity = new Team
            {
                TeamId = team.TeamId,
                TeamName = team.TeamName,
                Location = team.Location,
            };

            return teamEntity;
        }

        public Models.Models.Team MapToModel(Team team)
        {
            var teamModel = new Models.Models.Team
            {
                TeamId = team.TeamId,
                TeamName = team.TeamName,
                Location = team.Location,
            };

            return teamModel;
        }
    }
}