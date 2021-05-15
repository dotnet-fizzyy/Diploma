using WebAPI.Core.Entities;
using WebAPI.Core.Enums;
using WebAPI.Presentation.Models;
using WebAPI.Presentation.Models.Action;

namespace WebAPI.ApplicationLogic.Handlers
{
    public static class UserHandler
    {
        public static User CreateCustomerEntity(SignUpUser user)
        {
            return new User
            {
                UserName = user.UserName,
                Password = user.Password,
                Email = user.Email,
                UserPosition = UserPosition.Customer,
                UserRole = UserRole.Manager,
                IsActive = true
            };
        }
    }
}