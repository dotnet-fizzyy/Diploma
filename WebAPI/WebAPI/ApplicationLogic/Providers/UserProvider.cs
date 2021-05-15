using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Configuration;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Core.Interfaces.Providers;
using WebAPI.Models.Models.Result;
using WebAPI.Presentation.Models;
using WebAPI.Presentation.Models.Action;

namespace WebAPI.ApplicationLogic.Providers
{
    public class UserProvider : IUserProvider
    {
        private readonly IUserRepository _userRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly IProjectRepository _projectRepository;
        private readonly IRedisContext _redisContext;
        private readonly IUserMapper _userMapper;
        private readonly AppSettings _appSettings;

        public UserProvider(
            IUserRepository userRepository, 
            ITeamRepository teamRepository, 
            IProjectRepository projectRepository,
            IRedisContext redisContext,
            IUserMapper userMapper,
            AppSettings appSettings
            )
        {
            _projectRepository = projectRepository;
            _teamRepository = teamRepository;
            _userRepository = userRepository;
            _redisContext = redisContext;
            _userMapper = userMapper;
            _appSettings = appSettings;
        }
        
        public async Task<FullUser> GetFullUser(Guid userId)
        {
            if (_appSettings.Redis.EnableRedis)
            {
                var user = await _redisContext.Get<FullUser>(RedisUtilities.CreateRedisKeyForUser(userId));
                if (user != null)
                {
                    return user;
                }
            }
            
            var userEntity = await _userRepository.SearchForSingleItemAsync(x => x.Id == userId, x => x.TeamUsers);
            if (userEntity == null)
            {
                throw new UserFriendlyException(ErrorStatus.NOT_FOUND, ExceptionMessageGenerator.GetMissingEntityMessage(nameof(userId)));
            }

            var fullUser = await GetUser(userEntity);

            if (_appSettings.Redis.EnableRedis)
            {
                var userKey = RedisUtilities.CreateRedisKeyForUser(userId);
                await _redisContext.Set(userKey, fullUser, TimeSpan.FromHours(1));
            }

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
            ICollection<Team> teamEntities = null;
            IEnumerable<Project> projectEntities = null;
            
            if (userEntity.TeamUsers.Any())
            {
                teamEntities = await _teamRepository.GetUserTeams(userEntity.Id);
                projectEntities = await _projectRepository.GetProjectsByCollectionOfTeamIds(teamEntities);
            }

            var userFullModel = _userMapper.MapToFullModel(userEntity, projectEntities, teamEntities);
            
            return userFullModel;
        }
    }
}