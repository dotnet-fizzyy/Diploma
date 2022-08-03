using System.Linq;

using TeamEntity = WebAPI.Core.Entities.Team;
using TeamModel = WebAPI.Models.Basic.Team;
using TeamCompleteModel = WebAPI.Models.Complete.TeamComplete;
using TeamLightModel = WebAPI.Models.Light.TeamLight;

namespace WebAPI.ApplicationLogic.Mappers
{
    public static class TeamMapper
    {
        public static TeamEntity Map(TeamModel team)
        {
            if (team == null)
            {
                return new TeamEntity();
            }
            
            var teamEntity = new TeamEntity
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

        public static TeamModel Map(TeamEntity teamEntity)
        {
            if (teamEntity == null)
            {
                return new TeamModel();
            }

            var teamModel = new TeamModel();
            
            MapBaseEntityToModel(teamModel, teamEntity);

            return teamModel;
        }

        public static TeamCompleteModel MapToFullModel(TeamEntity teamEntity)
        {
            if (teamEntity == null)
            {
                return new TeamCompleteModel();
            }

            var fullTeamModel = new TeamCompleteModel();
            
            MapBaseEntityToModel(fullTeamModel, teamEntity);

            fullTeamModel.Users = teamEntity.TeamUsers
                .Select(teamUser => UserMapper.Map(teamUser.User))
                .ToList();

            return fullTeamModel;
        }

        public static TeamLightModel MapToSimpleModel(TeamEntity team)
        {
            if (team == null)
            {
                return new TeamLightModel();
            }

            var simpleTeamModel = new TeamLightModel
            {
                TeamId = team.Id,
                TeamName = team.TeamName,
                ProjectId = team.ProjectId,
                Location = team.Location
            };

            return simpleTeamModel;
        }


        private static void MapBaseEntityToModel(TeamModel model, TeamEntity entity)
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