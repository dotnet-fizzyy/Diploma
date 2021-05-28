using System;
using System.Collections.Generic;
using System.Linq;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Models.Result;
using WebAPI.Models.Models.Simple;
using WebAPI.Presentation.Models.Action;

namespace WebAPI.Presentation.Mappers
{
    public class UserMapper : IUserMapper
    {
        public User MapToEntity(WebAPI.Models.Models.Models.User user)
        {
            if (user == null)
            {
                return new User();
            }
            
            var userEntity = new User
            {
                Id = user.UserId,
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

        public WebAPI.Models.Models.Models.User MapToModel(User user)
        {
            if (user == null)
            {
                return new WebAPI.Models.Models.Models.User();
            }
            
            var userModel = new WebAPI.Models.Models.Models.User();
            
            MapBaseEntityToModel(userModel, user);
            
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
                UserName = user.Email,
                Password = user.Password,
                Email = user.UserName
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
                Email = user.Email,
                Password = user.Password
            };

            return userEntity;
        }

        public FullUser MapToFullModel(User user, IEnumerable<Project> projects, IEnumerable<Team> teams)
        {
            var fullUser = new FullUser();
            
            MapBaseEntityToModel(fullUser, user);
            fullUser.Projects = projects != null ? projects.Select(MapToUserProject).ToList() : new List<UserProject>();
            fullUser.Teams = teams != null ? teams.Select(MapToUserTeam).ToList() : new List<UserTeam>();
            
            return fullUser;
        }

        public UserSimpleModel MapToSimpleModel(User userEntity)
        {
            if (userEntity == null)
            {
                return new UserSimpleModel();
            }

            var userSimpleModel = new UserSimpleModel
            {
                UserId = userEntity.Id,
                UserName = userEntity.UserName,
                UserRole = Enum.Parse<WebAPI.Models.Enums.UserRole>(userEntity.UserRole.ToString(), true),
                UserPosition = Enum.Parse<WebAPI.Models.Enums.UserPosition>(userEntity.UserPosition.ToString(), true),
            };

            return userSimpleModel;
        }
        
        
        private static void MapBaseEntityToModel(WebAPI.Models.Models.Models.User userModel, User userEntity)
        {
            userModel.UserId = userEntity.Id;
            userModel.UserName = userEntity.UserName;
            userModel.IsActive = userEntity.IsActive;
            userModel.AvatarLink = userEntity.AvatarLink;
            userModel.WorkSpaceId = userEntity.WorkSpaceId;
            userModel.Email = userEntity.Email;
            userModel.CreationDate = userEntity.CreationDate;
            userModel.WorkSpaceId = userEntity.WorkSpaceId;
            userModel.UserRole = Enum.Parse<WebAPI.Models.Enums.UserRole>(userEntity.UserRole.ToString(), true);
            userModel.UserPosition = Enum.Parse<WebAPI.Models.Enums.UserPosition>(userEntity.UserPosition.ToString(), true);
        }
        
        private static UserTeam MapToUserTeam(Team team) => 
            new UserTeam
            {
                TeamId = team.Id,
                TeamName = team.TeamName,
                ProjectId = team.ProjectId
            };
        
        private static UserProject MapToUserProject(Project project) => 
            new UserProject
            {
                ProjectId = project.Id,
                ProjectName = project.ProjectName,
            };
    }
}