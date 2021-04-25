using System;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.ApplicationLogic.Services
{
    public class TeamService : ITeamService
    {
        private readonly ITeamRepository _teamRepository;
        private readonly ITeamUserRepository _teamUserRepository;
        private readonly ITeamMapper _teamMapper;

        public TeamService(
            ITeamRepository teamRepository,
            ITeamUserRepository teamUserRepository,
            ITeamMapper teamMapper
            )
        {
            _teamRepository = teamRepository;
            _teamUserRepository = teamUserRepository;
            _teamMapper = teamMapper;
        }

        public async Task<CollectionResponse<Team>> GetAllTeams()
        {
            var teamEntities = await _teamRepository.SearchForMultipleItemsAsync();
            
            var collectionResponse = new CollectionResponse<Team>
            {
                Items = teamEntities.Select(_teamMapper.MapToModel).ToList()
            };

            return collectionResponse;
        }

        public async Task<CollectionResponse<FullTeam>> GetUserTeams(Guid userId)
        {
            var teamEntities = await _teamRepository.GetUserTeams(userId);
            
            var collectionResponse = new CollectionResponse<FullTeam>
            {
                Items = teamEntities.Select(_teamMapper.MapToFullModel).ToList(),
            };

            return collectionResponse;
        }

        public async Task<Team> GetTeam(Guid teamId)
        {
            var teamEntity = await _teamRepository.SearchForSingleItemAsync(x => x.Id == teamId);

            if (teamEntity == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntityMessage(nameof(teamId)));
            }
            
            var team = _teamMapper.MapToModel(teamEntity);
            
            return team;
        }

        public async Task<FullTeam> GetFullTeamDescription(Guid teamId)
        {
            var teamEntity = 
                await _teamRepository.SearchForSingleItemAsync(
                    team => team.Id == teamId, 
                    include => include.TeamUsers
                    );

            if (teamEntity == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntityMessage(nameof(teamId)));
            }
            
            var teamFullModel = _teamMapper.MapToFullModel(teamEntity);
            
            return teamFullModel;
        }

        public async Task<Team> CreateTeam(Team team)
        {
            var teamEntity = _teamMapper.MapToEntity(team);
            teamEntity.CreationDate = DateTime.UtcNow;

            var createdTeamEntity = await _teamRepository.CreateAsync(teamEntity);

            var teamModel = _teamMapper.MapToModel(createdTeamEntity);

            return teamModel;
        }

        public async Task<Team> CreateTeamWithCustomer(Team team, Guid userId)
        {
            var teamEntity = _teamMapper.MapToEntity(team);
            teamEntity.CreationDate = DateTime.UtcNow;

            using var transaction = new TransactionScope(
                TransactionScopeOption.Required, 
                new TransactionOptions {IsolationLevel = IsolationLevel.Serializable},
                TransactionScopeAsyncFlowOption.Enabled
                );
            
            var createdTeamEntity = await _teamRepository.CreateAsync(teamEntity);
            var teamUser = new Core.Entities.TeamUser
            {
                TeamId = createdTeamEntity.Id,
                UserId = userId,
            };

            await _teamUserRepository.CreateAsync(teamUser);
            
            transaction.Complete();
            
            var teamModel = _teamMapper.MapToModel(createdTeamEntity);

            return teamModel;
        }

        public async Task<Team> UpdateTeam(Team team)
        {
            var teamEntity = _teamMapper.MapToEntity(team);

            var updatedTeamEntity = await _teamRepository.UpdateItemAsync(teamEntity);

            var teamModel = _teamMapper.MapToModel(updatedTeamEntity);

            return teamModel;
        }

        public async Task RemoveTeam(Guid id)
        {
            using var scope = new TransactionScope
            (
                TransactionScopeOption.Required, 
                new TransactionOptions
                {
                    IsolationLevel = IsolationLevel.Serializable,
                },
                TransactionScopeAsyncFlowOption.Enabled
            );
            
            await _teamRepository.DeleteAsync(x => x.Id == id);
            await _teamUserRepository.DeleteAsync(x => x.TeamId == id);
                
            scope.Complete();
        }
    }
}