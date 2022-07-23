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

using TeamEntity = WebAPI.Core.Entities.Team;
using TeamUserEntity = WebAPI.Core.Entities.TeamUser;

namespace WebAPI.ApplicationLogic.Services
{
    public class TeamService : ITeamService
    {
        private readonly IUnitOfWork _unitOfWork;

        public TeamService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<CollectionResponse<FullTeam>> GetUserTeamsAsync(Guid userId)
        {
            var teamEntities = await _unitOfWork.TeamRepository.GetUserTeams(userId);
            
            var collectionResponse = new CollectionResponse<FullTeam>
            {
                Items = teamEntities.Select(TeamMapper.MapToFullModel).ToList(),
            };

            return collectionResponse;
        }

        public async Task<Team> GetTeamByIdAsync(Guid teamId)
        {
            var teamEntity = await _unitOfWork.TeamRepository
                .SearchForSingleItemAsync(team => team.Id == teamId);

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
            var teamEntity = await _unitOfWork.TeamRepository.GetTeamWithUsers(teamId);

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
            teamEntity.TeamUsers.Add(new TeamUserEntity { UserId = userId });

            var teamModel = await CreateTeam(teamEntity);

            return teamModel;
        }

        public async Task<Team> UpdateTeamAsync(Team team)
        {
            var teamEntity = TeamMapper.Map(team);

            _unitOfWork.TeamRepository.UpdateItem(teamEntity);

            await _unitOfWork.CommitAsync();
            
            var teamModel = TeamMapper.Map(teamEntity);

            return teamModel;
        }

        public async Task RemoveTeamSoftAsync(Team team)
        {
            await _unitOfWork.TeamRepository.DeleteSoftAsync(team.TeamId);
            
            await _unitOfWork.CommitAsync();
        }

        public async Task RemoveTeamAsync(Guid id)
        {
            _unitOfWork.TeamRepository.Remove(team => team.Id == id);
            
            await _unitOfWork.CommitAsync();
        }


        private async Task<Team> CreateTeam(TeamEntity teamEntity)
        {
            teamEntity.CreationDate = DateTime.UtcNow;
            
            await _unitOfWork.TeamRepository.CreateAsync(teamEntity);

            await _unitOfWork.CommitAsync();
            
            var teamModel = TeamMapper.Map(teamEntity);

            return teamModel;
        }
    }
}