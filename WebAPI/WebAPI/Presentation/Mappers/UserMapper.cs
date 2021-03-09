using System;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Models;
using User = WebAPI.Core.Entities.User;

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
                TeamId = user.TeamId,
                UserName = user.UserName,
                Password = user.Password,
                IsActive = user.IsActive,
                AvatarLink = user.AvatarLink,
                Email = user.Email,
                RecordVersion = user.RecordVersion,
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
            
            var userModel = new Models.Models.User
            {
                UserId = user.Id,
                TeamId = user.TeamId,
                UserName = user.UserName,
                IsActive = user.IsActive,
                AvatarLink = user.AvatarLink,
                Email = user.Email,
                RecordVersion = user.RecordVersion,
                UserRole = Enum.Parse<Models.Enums.UserRole>(user.UserRole.ToString(), true),
                UserPosition = Enum.Parse<Models.Enums.UserPosition>(user.UserPosition.ToString(), true),
            };

            return userModel;
        }

        public User MapToEntity(AuthenticationUser user)
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
    }
}