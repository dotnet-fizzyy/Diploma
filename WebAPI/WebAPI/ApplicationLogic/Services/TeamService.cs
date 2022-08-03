using System;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.ApplicationLogic.Mappers;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Basic;
using WebAPI.Models.Complete;
using WebAPI.Models.Extensions;

using TeamEntity = WebAPI.Core.Entities.Team;
using UserEntity = WebAPI.Core.Entities.User;
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

        public async Task<CollectionResponse<TeamComplete>> GetUserTeamsAsync(Guid userId)
        {
            var teamEntities = await _unitOfWork.TeamRepository.GetUserTeams(userId);
            
            var collectionResponse = new CollectionResponse<TeamComplete>
            {
                Items = teamEntities.Select(TeamMapper.MapToFullModel).ToList(),
            };

            return collectionResponse;
        }

        public async Task<Team> GetByIdAsync(Guid id)
        {
            var teamEntity = await _unitOfWork.TeamRepository.SearchForItemById(id, includeTracking: false);

            ValidateTeamExistence(teamEntity);
            
            var team = TeamMapper.Map(teamEntity);
            
            return team;
        }

        public async Task<TeamComplete> GetFullDescriptionAsync(Guid id)
        {
            var teamEntity = await _unitOfWork.TeamRepository.GetTeamWithUsers(id);

            ValidateTeamExistence(teamEntity);
            
            var teamFullModel = TeamMapper.MapToFullModel(teamEntity);
            
            return teamFullModel;
        }

        public async Task<Team> CreateAsync(Team team)
        {
            var teamEntity = TeamMapper.Map(team);

            var teamModel = await CreateTeam(teamEntity);

            return teamModel;
        }

        public async Task AssignUserToTeam(Guid userId, Guid teamId)
        {
            var teamTask = _unitOfWork.TeamRepository.SearchForItemById(teamId, includeTracking: true);
            var userTask = _unitOfWork.UserRepository.SearchForItemById(userId, includeTracking: true);

            await Task.WhenAll(teamTask, userTask);
            
            ValidateTeamExistence(teamTask.Result);
            ValidateUserExistence(userTask.Result);
            
            teamTask.Result.TeamUsers.Add(new TeamUserEntity
            {
                TeamId = teamId,
                UserId = userId
            });

            await _unitOfWork.CommitAsync();
        }

        public async Task<Team> UpdateAsync(Team team)
        {
            var teamEntity = TeamMapper.Map(team);

            _unitOfWork.TeamRepository.UpdateItem(teamEntity);

            await _unitOfWork.CommitAsync();
            
            var teamModel = TeamMapper.Map(teamEntity);

            return teamModel;
        }

        public async Task SoftRemoveAsync(Guid id)
        {
            var teamEntity = new TeamEntity
            {
                Id = id,
                IsDeleted = true
            };
            
            _unitOfWork.TeamRepository.UpdateItem(teamEntity, prop => prop.IsDeleted);
            
            await _unitOfWork.CommitAsync();
        }

        public async Task RemoveAsync(Guid id)
        {
            _unitOfWork.TeamRepository.Remove(team => team.Id == id);
            
            await _unitOfWork.CommitAsync();
        }


        private static void ValidateTeamExistence(TeamEntity team)
        {
            if (team == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND,
                    ExceptionMessageGenerator.GetMissingEntityMessage("team id")
                );
            }
        }
        
        private static void ValidateUserExistence(UserEntity user)
        {
            if (user == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND,
                    ExceptionMessageGenerator.GetMissingEntityMessage("user id")
                );
            }
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