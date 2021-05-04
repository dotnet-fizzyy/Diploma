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
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.ApplicationLogic.Services
{
    public class TeamService : ITeamService
    {
        private readonly ITeamRepository _teamRepository;
        private readonly ITeamMapper _teamMapper;

        public TeamService(
            ITeamRepository teamRepository,
            ITeamMapper teamMapper
            )
        {
            _teamRepository = teamRepository;
            _teamMapper = teamMapper;
        }

        public async Task<CollectionResponse<Team>> GetAllTeamsAsync()
        {
            var teamEntities = await _teamRepository.SearchForMultipleItemsAsync();
            
            var collectionResponse = new CollectionResponse<Team>
            {
                Items = teamEntities.Select(_teamMapper.MapToModel).ToList()
            };

            return collectionResponse;
        }

        public async Task<CollectionResponse<FullTeam>> GetUserTeamsAsync(Guid userId)
        {
            var teamEntities = await _teamRepository.GetUserTeams(userId);
            
            var collectionResponse = new CollectionResponse<FullTeam>
            {
                Items = teamEntities.Select(_teamMapper.MapToFullModel).ToList(),
            };

            return collectionResponse;
        }

        public async Task<Team> GetTeamByIdAsync(Guid teamId)
        {
            var teamEntity = await _teamRepository.SearchForSingleItemAsync(x => x.Id == teamId);

            if (teamEntity == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntityMessage(nameof(teamId)));
            }
            
            var team = _teamMapper.MapToModel(teamEntity);
            
            return team;
        }

        public async Task<FullTeam> GetFullTeamDescriptionAsync(Guid teamId)
        {
            var teamEntity = await _teamRepository.GetTeamWithUsers(teamId);

            if (teamEntity == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntityMessage(nameof(teamId)));
            }
            
            var teamFullModel = _teamMapper.MapToFullModel(teamEntity);
            
            return teamFullModel;
        }

        public async Task<Team> CreateTeamAsync(Team team)
        {
            var teamEntity = _teamMapper.MapToEntity(team);

            var teamModel = await CreateTeam(teamEntity);

            return teamModel;
        }

        public async Task<Team> CreateTeamWithCustomerAsync(Team team, Guid userId)
        {
            var teamEntity = _teamMapper.MapToEntity(team);
            teamEntity.TeamUsers.Add(new Core.Entities.TeamUser { UserId = userId });

            var teamModel = await CreateTeam(teamEntity);

            return teamModel;
        }

        public async Task<Team> UpdateTeamAsync(Team team)
        {
            var teamEntity = _teamMapper.MapToEntity(team);

            var updatedTeamEntity = await _teamRepository.UpdateItemAsync(teamEntity);

            var teamModel = _teamMapper.MapToModel(updatedTeamEntity);

            return teamModel;
        }

        public async Task RemoveTeamAsync(Guid id)
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
                
            scope.Complete();
        }


        private async Task<Team> CreateTeam(Core.Entities.Team teamEntity)
        {
            teamEntity.CreationDate = DateTime.UtcNow;
            
            var createdTeamEntity = await _teamRepository.CreateAsync(teamEntity);

            var teamModel = _teamMapper.MapToModel(createdTeamEntity);

            return teamModel;
        }
    }
}