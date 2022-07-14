using System.Linq;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Models.Result;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Presentation.Mappers
{
    public class TeamMapper : ITeamMapper
    {
        public Team MapToEntity(WebAPI.Models.Models.Models.Team team)
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
                IsDeleted = team.IsDeleted,
            };

            return teamEntity;
        }

        public WebAPI.Models.Models.Models.Team MapToModel(Team teamEntity)
        {
            if (teamEntity == null)
            {
                return new WebAPI.Models.Models.Models.Team();
            }

            var teamModel = new WebAPI.Models.Models.Models.Team();
            
            MapBaseEntityToModel(teamModel, teamEntity);

            return teamModel;
        }

        public FullTeam MapToFullModel(Team teamEntity)
        {
            if (teamEntity == null)
            {
                return new FullTeam();
            }

            var fullTeamModel = new FullTeam();
            
            MapBaseEntityToModel(fullTeamModel, teamEntity);

            fullTeamModel.Users = teamEntity.TeamUsers
                .Select(teamUser => UserMapper.Map(teamUser.User))
                .ToList();

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
                ProjectId = team.ProjectId,
                Location = team.Location,
            };

            return simpleTeamModel;
        }


        private static void MapBaseEntityToModel(WebAPI.Models.Models.Models.Team model, Team entity)
        {
            model.TeamId = entity.Id;
            model.ProjectId = entity.ProjectId;
            model.TeamName = entity.TeamName;
            model.Location = entity.Location;
            model.MembersCount = entity.MembersCount;
            model.CreationDate = entity.CreationDate;
            model.IsDeleted = entity.IsDeleted;
        }
    }
}