using System.Linq;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Models.Result;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Presentation.Mappers
{
    public class TeamMapper : ITeamMapper
    {
        private readonly IUserMapper _userMapper;

        public TeamMapper(IUserMapper userMapper)
        {
            _userMapper = userMapper;
        }
        
        public Team MapToEntity(Models.Models.Models.Team team)
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
                Location = team.Location,
                CreationDate = team.CreationDate,
            };

            return teamEntity;
        }

        public Models.Models.Models.Team MapToModel(Team team)
        {
            if (team == null)
            {
                return new Models.Models.Models.Team();
            }
            
            var teamModel = new Models.Models.Models.Team
            {
                TeamId = team.Id,
                ProjectId = team.ProjectId,
                TeamName = team.TeamName,
                Location = team.Location,
                MembersCount = team.MembersCount,
                CreationDate = team.CreationDate
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
                ProjectId = team.ProjectId,
                CreationDate = team.CreationDate,
                Users = team.TeamUsers.Select(x => _userMapper.MapToModel(x.User)).ToList()
            };

            return fullTeamModel;
        }

        public TeamSimpleModel MapToSimpleModel(Team team)
        {
            if (team == null)
            {
                return new TeamSimpleModel();
            }

            var simpleTeamModel = new TeamSimpleModel
            {
                TeamId = team.Id,
                TeamName = team.TeamName,
            };

            return simpleTeamModel;
        }
    }
}