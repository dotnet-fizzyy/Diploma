using System.Linq;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Result;

namespace WebAPI.Presentation.Mappers
{
    public class TeamMapper : ITeamMapper
    {
        private readonly IUserMapper _userMapper;

        public TeamMapper(IUserMapper userMapper)
        {
            _userMapper = userMapper;
        }
        
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

        public FullTeam MapToFullModel(Team team)
        {
            var fullTeamModel = new FullTeam
            {
                TeamId = team.TeamId,
                TeamName = team.TeamName,
                Location = team.Location,
                Users = team.Users.Select(_userMapper.MapToModel).ToList(),
            };

            return fullTeamModel;
        }
    }
}