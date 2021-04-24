using System;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Models.Authentication;
using WebAPI.Models.Models.Result;

namespace WebAPI.Presentation.Mappers
{
    public class UserMapper : IUserMapper
    {
        public User MapToEntity(Models.Models.User user)
        {
            if (user == null)
            {
                return new User();
            }
            
            var userEntity = new User
            {
                Id = user.UserId,
                TeamUserId = user.TeamId,
                UserName = user.UserName,
                Password = user.Password,
                IsActive = user.IsActive,
                AvatarLink = user.AvatarLink,
                WorkSpaceId = user.WorkSpaceId,
                Email = user.Email,
                CreationDate = user.CreationDate,
                UserRole = Enum.Parse<Core.Enums.UserRole>(user.UserRole.ToString(), true),
                UserPosition = Enum.Parse<Core.Enums.UserPosition>(user.UserPosition.ToString(), true),
            };

            return userEntity;
        }

        public Models.Models.User MapToModel(User user)
        {
            if (user == null)
            {
                return new Models.Models.User();
            }
            
            var userModel = new Models.Models.User();
            MapBaseModelProperties(userModel, user);
            
            return userModel;
        }

        public User MapToEntity(SignUpUser user)
        {
            if (user == null)
            {
                return new User();
            }
            
            var userEntity = new User
            {
                UserName = user.UserName,
                Password = user.Password,
                Email = user.Email
            };

            return userEntity;
        }

        public User MapToEntity(SignInUser user)
        {
            if (user == null)
            {
                return new User();
            }
            
            var userEntity = new User
            {
                UserName = user.UserName,
                Password = user.Password
            };

            return userEntity;
        }

        public FullUser MapToFullModel(User user, Project project, Team team)
        {
            var fullUser = new FullUser();
            MapBaseModelProperties(fullUser, user);
            
            fullUser.ProjectId = project?.Id;
            fullUser.ProjectName = project?.ProjectName;
            fullUser.TeamId = team?.Id;

            return fullUser;
        }
        
        private static void MapBaseModelProperties(Models.Models.User userModel, User userEntity)
        {
            userModel.UserId = userEntity.Id;
            userModel.TeamId = userEntity.TeamUserId;
            userModel.UserName = userEntity.UserName;
            userModel.IsActive = userEntity.IsActive;
            userModel.AvatarLink = userEntity.AvatarLink;
            userModel.WorkSpaceId = userEntity.WorkSpaceId;
            userModel.Email = userEntity.Email;
            userModel.CreationDate = userEntity.CreationDate;
            userModel.WorkSpaceId = userEntity.WorkSpaceId;
            userModel.UserRole = Enum.Parse<Models.Enums.UserRole>(userEntity.UserRole.ToString(), true);
            userModel.UserPosition = Enum.Parse<Models.Enums.UserPosition>(userEntity.UserPosition.ToString(), true);
        }
    }
}