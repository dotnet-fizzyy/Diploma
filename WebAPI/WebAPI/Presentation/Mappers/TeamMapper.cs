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
            if (team == null)
            {
                return new Team();
            }
            
            var teamEntity = new Team
            {
                Id = team.TeamId,
                ProjectId = team.ProjectId,
                TeamName = team.TeamName,
                Location = team.Location
            };

            return teamEntity;
        }

        public Models.Models.Team MapToModel(Team team)
        {
            if (team == null)
            {
                return new Models.Models.Team();
            }
            
            var teamModel = new Models.Models.Team
            {
                TeamId = team.Id,
                ProjectId = team.ProjectId,
                TeamName = team.TeamName,
                Location = team.Location,
                MembersCount = team.MembersCount
            };

            return teamModel;
        }

        public FullTeam MapToFullModel(Team team)
        {
            if (team == null)
            {
                return new FullTeam();
            }
            
            var fullTeamModel = new FullTeam
            {
                TeamId = team.Id,
                TeamName = team.TeamName,
                Location = team.Location,
                Users = team.Users.Select(_userMapper.MapToModel).ToList(),
            };

            return fullTeamModel;
        }
    }
}