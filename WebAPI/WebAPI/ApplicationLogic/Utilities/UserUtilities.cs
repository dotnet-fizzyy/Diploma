using WebAPI.Core.Entities;
using WebAPI.Core.Enums;
using WebAPI.Presentation.Models.Action;

namespace WebAPI.ApplicationLogic.Utilities
{
    public static class UserUtilities
    {
        public static User CreateCustomerEntity(SignUpUser user)
        {
            return new User
            {
                UserName = user.Email,
                Password = user.Password,
                Email = user.UserName,
                UserPosition = UserPosition.Customer,
                UserRole = UserRole.Manager,
                IsActive = true
            };
        }
    }
}