using System;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.ApplicationLogic.Mappers;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.ApplicationLogic.Services
{
    public class TeamService : ITeamService
    {
        private readonly ITeamRepository _teamRepository;

        public TeamService(ITeamRepository teamRepository)
        {
            _teamRepository = teamRepository;
        }

        public async Task<CollectionResponse<FullTeam>> GetUserTeamsAsync(Guid userId)
        {
            var teamEntities = await _teamRepository.GetUserTeams(userId);
            
            var collectionResponse = new CollectionResponse<FullTeam>
            {
                Items = teamEntities.Select(TeamMapper.MapToFullModel).ToList(),
            };

            return collectionResponse;
        }

        public async Task<Team> GetTeamByIdAsync(Guid teamId)
        {
            var teamEntity = await _teamRepository.SearchForSingleItemAsync(x => x.Id == teamId);
            if (teamEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND, 
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(teamId))
                );
            }
            
            var team = TeamMapper.Map(teamEntity);
            
            return team;
        }

        public async Task<FullTeam> GetFullTeamDescriptionAsync(Guid teamId)
        {
            var teamEntity = await _teamRepository.GetTeamWithUsers(teamId);
            if (teamEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND,
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(teamId))
                );
            }
            
            var teamFullModel = TeamMapper.MapToFullModel(teamEntity);
            
            return teamFullModel;
        }

        public async Task<Team> CreateTeamAsync(Team team)
        {
            var teamEntity = TeamMapper.Map(team);

            var teamModel = await CreateTeam(teamEntity);

            return teamModel;
        }

        public async Task<Team> CreateTeamWithCustomerAsync(Team team, Guid userId)
        {
            var teamEntity = TeamMapper.Map(team);
            teamEntity.TeamUsers.Add(new Core.Entities.TeamUser { UserId = userId });

            var teamModel = await CreateTeam(teamEntity);

            return teamModel;
        }

        public async Task<Team> UpdateTeamAsync(Team team)
        {
            var teamEntity = TeamMapper.Map(team);

            var updatedTeamEntity = await _teamRepository.UpdateItemAsync(teamEntity);

            var teamModel = TeamMapper.Map(updatedTeamEntity);

            return teamModel;
        }

        public async Task RemoveTeamSoftAsync(Team team)
        {
            await _teamRepository.DeleteSoftAsync(team.TeamId);
        }

        public async Task RemoveTeamAsync(Guid id)
        {
            await _teamRepository.DeleteAsync(x => x.Id == id);
        }


        private async Task<Team> CreateTeam(Core.Entities.Team teamEntity)
        {
            teamEntity.CreationDate = DateTime.UtcNow;
            
            var createdTeamEntity = await _teamRepository.CreateAsync(teamEntity);

            var teamModel = TeamMapper.Map(createdTeamEntity);

            return teamModel;
        }
    }
}