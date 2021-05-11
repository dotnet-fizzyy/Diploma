using System;
using System.Collections.Generic;
using System.Linq;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Models.Authentication;
using WebAPI.Models.Models.Result;

namespace WebAPI.Presentation.Mappers
{
    public class UserMapper : IUserMapper
    {
        public User MapToEntity(Models.Models.Models.User user)
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

        public Models.Models.Models.User MapToModel(User user)
        {
            if (user == null)
            {
                return new Models.Models.Models.User();
            }
            
            var userModel = new Models.Models.Models.User();
            
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

        public FullUser MapToFullModel(User user, IEnumerable<Project> projects, IEnumerable<Team> teams)
        {
            var fullUser = new FullUser();
            
            MapBaseEntityToModel(fullUser, user);
            fullUser.Projects = projects != null ? projects.Select(MapToUserProject).ToList() : new List<UserProject>();
            fullUser.Teams = teams != null ? teams.Select(MapToUserTeam).ToList() : new List<UserTeam>();
            
            return fullUser;
        }
        
        private static void MapBaseEntityToModel(Models.Models.Models.User userModel, User userEntity)
        {
            userModel.UserId = userEntity.Id;
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

        
        private static UserTeam MapToUserTeam(Team team) => 
            new UserTeam
            {
                TeamId = team.Id,
                TeamName = team.TeamName,
            };
        
        private static UserProject MapToUserProject(Project project) => 
            new UserProject
            {
                ProjectId = project.Id,
                ProjectName = project.ProjectName,
            };
    }
}