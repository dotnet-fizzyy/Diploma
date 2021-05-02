using WebAPI.Core.Entities;
using WebAPI.Core.Enums;
using WebAPI.Models.Models.Authentication;

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
                UserRole = UserRole.ProductOwner,
                IsActive = true
            };
        }
    }
}