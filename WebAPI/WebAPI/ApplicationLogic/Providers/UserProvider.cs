using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.ApplicationLogic.Mappers;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Providers;
using WebAPI.Models.Models.Result;
using WebAPI.Presentation.Models.Request;

namespace WebAPI.ApplicationLogic.Providers
{
    public class UserProvider : IUserProvider
    {
        private readonly IUserRepository _userRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly IProjectRepository _projectRepository;
        private readonly ICacheContext _cacheContext;

        public UserProvider(
            IUserRepository userRepository,
            ITeamRepository teamRepository,
            IProjectRepository projectRepository,
            ICacheContext cacheContext)
        {
            _projectRepository = projectRepository;
            _teamRepository = teamRepository;
            _userRepository = userRepository;
            _cacheContext = cacheContext;
        }

        public async Task<FullUser> GetFullUser(Guid userId)
        {
            var user = await _cacheContext.Get<FullUser>(RedisUtilities.CreateRedisKeyForUser(userId));

            if (user != null)
            {
                return user;
            }

            var userEntity = await _userRepository.SearchForSingleItemAsync(
                entity => entity.Id == userId,
                includes => includes.TeamUsers);

            if (userEntity == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntityMessage(nameof(userId)));
            }

            var fullUser = await GetUser(userEntity);

            var userKey = RedisUtilities.CreateRedisKeyForUser(userId);

            await _cacheContext.Set(userKey, fullUser, TimeSpan.FromHours(1));

            return fullUser;
        }

        public async Task<FullUser> GetFullUser(SignInUserRequestModel signInUserRequestModel)
        {
            var userEntity = UserMapper.Map(signInUserRequestModel);
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
            ICollection<Team> teamEntities = null;
            IEnumerable<Project> projectEntities = null;

            if (userEntity.TeamUsers.Any())
            {
                teamEntities = await _teamRepository.GetUserTeams(userEntity.Id);
                projectEntities = userEntity.UserPosition == UserPosition.Customer
                    ? await _projectRepository.SearchForMultipleItemsAsync(x => x.WorkSpaceId == userEntity.WorkSpaceId)
                    : await _projectRepository.GetProjectsByCollectionOfTeamIds(teamEntities);
            }

            var userFullModel = UserMapper.Map(userEntity, projectEntities, teamEntities);

            return userFullModel;
        }
    }
}