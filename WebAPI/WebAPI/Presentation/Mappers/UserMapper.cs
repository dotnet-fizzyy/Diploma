using WebAPI.Core.Entities;
using WebAPI.Core.Enums;
using WebAPI.Core.Interfaces.Mappers;

namespace WebAPI.Presentation.Mappers
{
    public class UserMapper : IUserMapper
    {
        public User MapToEntity(Models.Models.User user)
        {
            var userEntity = new User
            {
                UserId = user.UserId,
                UserName = user.UserName,
                IsActive = user.IsActive,
                AvatarLink = user.AvatarLink,
                Email = user.Email,
                RecordVersion = user.RecordVersion,
                UserRole = (UserRole)user.UserRole,
                UserPosition = (UserPosition)user.UserPosition
            };

            return userEntity;
        }

        public Models.Models.User MapToModel(User user)
        {
            var userModel = new Models.Models.User
            {
                UserId = user.UserId,
                UserName = user.UserName,
                IsActive = user.IsActive,
                AvatarLink = user.AvatarLink,
                Email = user.Email,
                RecordVersion = user.RecordVersion,
                UserRole = (Models.Enums.UserRole)user.UserRole,
                UserPosition = (Models.Enums.UserPosition)user.UserPosition,
            };

            return userModel;
        }
    }
}