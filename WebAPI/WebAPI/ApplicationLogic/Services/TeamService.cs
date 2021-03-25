using System;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models;
using WebAPI.Models.Result;

namespace WebAPI.ApplicationLogic.Services
{
    public class TeamService : ITeamService
    {
        private readonly ITeamRepository _teamRepository;
        private readonly IUserRepository _userRepository;
        private readonly ITeamMapper _teamMapper;

        public TeamService(
            ITeamRepository teamRepository, 
            IUserRepository userRepository, 
            ITeamMapper teamMapper
            )
        {
            _teamRepository = teamRepository;
            _userRepository = userRepository;
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
            var teamEntity = 
                await _teamRepository.SearchForSingleItemAsync(x => x.Id == teamId);

            if (teamEntity == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, "Unable to find team with provided id");
            }
            
            var team = _teamMapper.MapToModel(teamEntity);
            
            return team;
        }

        public async Task<FullTeam> GetFullTeamDescription(Guid teamId)
        {
            var teamEntity = 
                await _teamRepository.SearchForSingleItemAsync(
                    team => team.Id == teamId, 
                    include => include.Users
                    );

            if (teamEntity == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, "Unable to find team with provided id");
            }
            
            var teamFullModel = _teamMapper.MapToFullModel(teamEntity);
            
            return teamFullModel;
        }

        public async Task<Team> CreateTeam(Team team)
        {
            var teamEntity = _teamMapper.MapToEntity(team);
            teamEntity.CreationDate = DateTime.UtcNow.ToUniversalTime();

            var createdTeamEntity = await _teamRepository.CreateAsync(teamEntity);

            var teamModel = _teamMapper.MapToModel(createdTeamEntity);

            return teamModel;
        }

        public async Task<Team> CreateTeamWithCustomer(Team team, Guid userId)
        {
            var teamEntity = _teamMapper.MapToEntity(team);
            teamEntity.CreationDate = DateTime.UtcNow.ToUniversalTime();

            var createdTeamEntity = await _teamRepository.CreateAsync(teamEntity);
            var customer = await _userRepository.SearchForSingleItemAsync(x => x.Id == userId);
            customer.TeamId = createdTeamEntity.Id;

            await _userRepository.UpdateItemAsync(customer);
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
            using (var scope = new TransactionScope
                (
                    TransactionScopeOption.Required, 
                    new TransactionOptions
                    {
                        IsolationLevel = IsolationLevel.Serializable,
                    },
                    TransactionScopeAsyncFlowOption.Enabled
                )
            )
            {
                await _userRepository.DeleteAsync(x => x.TeamId == id);
                await _teamRepository.DeleteAsync(x => x.Id == id);
                
                scope.Complete();
            }
        }
    }
}