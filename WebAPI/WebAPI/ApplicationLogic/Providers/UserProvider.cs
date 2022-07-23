using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.ApplicationLogic.Mappers;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Configuration;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Models.Models.Result;
using WebAPI.Presentation.Models.Request;

namespace WebAPI.ApplicationLogic.Providers
{
    public class UserProvider
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICacheContext _cacheContext;
        private readonly AppSettings _appSettings;

        public UserProvider(IUnitOfWork unitOfWork, ICacheContext cacheContext, AppSettings appSettings)
        {
            _unitOfWork = unitOfWork;
            _cacheContext = cacheContext;
            _appSettings = appSettings;
        }
        
        public async Task<FullUser> GetFullUser(Guid userId)
        {
            if (_appSettings.Redis.EnableRedis)
            {
                var user = await GetUserFromCache(userId);

                if (user != null)
                {
                    return user;
                }
            }
            
            var userEntity = await _unitOfWork.UserRepository.SearchForItemById(
                userId, 
                include => include.TeamUsers);
            
            if (userEntity == null)
            {
                throw new UserFriendlyException(
                    ErrorStatus.NOT_FOUND, 
                    ExceptionMessageGenerator.GetMissingEntityMessage(nameof(userId)));
            }

            var fullUser = await GetUser(userEntity);

            if (_appSettings.Redis.EnableRedis)
            {
                await SetUserToCache(fullUser);
            }

            return fullUser;
        }

        // todo: split to follow Single resp.
        public async Task<FullUser> AuthenticateAndGetFullUser(SignInUserRequestModel signInUserRequestModel)
        {
            var userEntity = UserMapper.Map(signInUserRequestModel);
            userEntity.Password = PasswordHashing.CreateHashPassword(userEntity.Password);

            var authUser = await _unitOfWork.UserRepository.AuthenticateUser(userEntity);

            if (authUser == null)
            {
                throw new UserFriendlyException(ErrorStatus.INVALID_DATA, "Unable to authenticate user");
            }
            
            var fullUser = await GetUser(authUser);

            return fullUser;
        }

        private async Task<FullUser> GetUserFromCache(Guid userId) =>
            await _cacheContext.Get<FullUser>(RedisUtilities.CreateRedisKeyForUser(userId));

        private async Task SetUserToCache( FullUser fullUser)
        {
            var userKey = RedisUtilities.CreateRedisKeyForUser(fullUser.UserId);
 
            await _cacheContext.Set(userKey, fullUser, TimeSpan.FromHours(1));
        }
        
        private async Task<FullUser> GetUser(User userEntity)
        {
            ICollection<Team> teamEntities = null;
            IEnumerable<Project> projectEntities = null;
            
            if (userEntity.TeamUsers.Any())
            {
                teamEntities = await _unitOfWork.TeamRepository.GetUserTeams(userEntity.Id);

                if (userEntity.UserPosition == UserPosition.Customer)
                {
                    projectEntities = await _unitOfWork.ProjectRepository
                        .SearchForMultipleItemsAsync(project => project.WorkSpaceId == userEntity.WorkSpaceId);
                }
                else
                {
                    projectEntities = await _unitOfWork.ProjectRepository
                        .GetProjectsByCollectionOfTeamIds(teamEntities);
                }
            }

            var userFullModel = UserMapper.Map(userEntity, projectEntities, teamEntities);
            
            return userFullModel;
        }
    }
}