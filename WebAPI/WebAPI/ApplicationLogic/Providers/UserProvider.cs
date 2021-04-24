using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Core.Interfaces.Providers;
using WebAPI.Models.Models.Authentication;
using WebAPI.Models.Models.Result;

namespace WebAPI.ApplicationLogic.Providers
{
    public class UserProvider : IUserProvider
    {
        private readonly IUserRepository _userRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly IProjectRepository _projectRepository;
        private readonly IUserMapper _userMapper;

        public UserProvider(
            IUserRepository userRepository, 
            ITeamRepository teamRepository, 
            IProjectRepository projectRepository,
            IUserMapper userMapper
            )
        {
            _projectRepository = projectRepository;
            _teamRepository = teamRepository;
            _userRepository = userRepository;
            _userMapper = userMapper;
        }
        
        public async Task<FullUser> GetFullUser(Guid userId)
        {
            var userEntity = await _userRepository.SearchForSingleItemAsync(x => x.Id == userId, x => x.TeamUsers);
            if (userEntity == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, "Unable to find user with provided id");
            }

            var fullUser = await GetUser(userEntity);

            return fullUser;
        }

        public async Task<FullUser> GetFullUser(SignInUser signInUser)
        {
            //Authenticate user (find in db)
            var userEntity = _userMapper.MapToEntity(signInUser);
            userEntity.Password = PasswordHashing.CreateHashPassword(userEntity.Password);

            var authUser = await _userRepository.AuthenticateUser(userEntity);
            if (authUser == null)
            {
                throw new UserFriendlyException(ErrorStatus.INVALID_DATA, "Unable to authenticate user");
            }
            
            var fullUser = await GetUser(authUser);

            return fullUser;
        }

        private async Task<FullUser> GetUser(User userEntity)
        {
            IEnumerable<Team> teamEntities = null;
            IEnumerable<Project> projectEntities = null;
            
            if (userEntity.TeamUsers.Any())
            {
                teamEntities = await _teamRepository.GetUserTeams(userEntity.Id);
                projectEntities = await _projectRepository.SearchForMultipleItemsAsync(x => teamEntities.Any(t => t.ProjectId == x.Id));
            }

            var userFullModel = _userMapper.MapToFullModel(userEntity, projectEntities, teamEntities);
            
            return userFullModel;
        }
    }
}