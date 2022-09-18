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

            return new CollectionResponse<TeamComplete>
            {
                Items = teamEntities.Select(TeamMapper.MapToFullModel).ToList(),
            };
        }

        public async Task<CollectionResponse<Team>> SearchTeams(
            Guid userId,
            string searchTerm,
            int limit,
            int offset)
        {
            var user = await _unitOfWork.UserRepository.SearchForItemById(userId, includeTracking: false);

            ValidateWorkspaceExistence(user.WorkSpaceId);
            
            var userTeams = await _unitOfWork.TeamRepository.GetTeamsBySearchTerm(
                user.WorkSpaceId!.Value,
                searchTerm,
                limit,
                offset);

            return new CollectionResponse<Team>
            {
                Items = userTeams.Select(TeamMapper.Map).ToList(),
            };
        }

        public async Task<Team> GetByIdAsync(Guid id)
        {
            var teamEntity = await _unitOfWork.TeamRepository.SearchForItemById(id, includeTracking: false);

            ValidateTeamExistence(teamEntity);
            
            return TeamMapper.Map(teamEntity);
        }

        public async Task<TeamComplete> GetCompleteDescriptionAsync(Guid id)
        {
            var teamEntity = await _unitOfWork.TeamRepository.GetTeamWithUsers(id);

            ValidateTeamExistence(teamEntity);
            
            return TeamMapper.MapToFullModel(teamEntity);
        }

        public async Task<Team> CreateAsync(Team team)
        {
            var teamEntity = TeamMapper.Map(team);

            return await CreateTeam(teamEntity);
        }

        public async Task AssignUserToTeam(Guid userId, Guid teamId)
        {
            var teamTask = _unitOfWork.TeamRepository.SearchForItemById(teamId, includeTracking: true);
            var userTask = _unitOfWork.UserRepository.SearchForItemById(userId, includeTracking: false);

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
            
            return TeamMapper.Map(teamEntity);;
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
        
        private static void ValidateWorkspaceExistence(Guid? workspaceId)
        {
            if (!workspaceId.HasValue)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND,
                    "User is not assigned to any workspace"
                );
            }
        }
        
        private async Task<Team> CreateTeam(TeamEntity teamEntity)
        {
            teamEntity.CreationDate = DateTime.UtcNow;
            
            await _unitOfWork.TeamRepository.CreateAsync(teamEntity);

            await _unitOfWork.CommitAsync();

            return TeamMapper.Map(teamEntity);
        }
    }
}