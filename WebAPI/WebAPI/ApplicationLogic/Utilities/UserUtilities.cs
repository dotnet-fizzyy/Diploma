using WebAPI.Core.Entities;
using WebAPI.Core.Enums;
using WebAPI.Presentation.Models.Request;

namespace WebAPI.ApplicationLogic.Utilities
{
    public static class UserUtilities
    {
        public static User CreateCustomerEntity(SignUpUserRequestModel userRequestModel)
        {
            return new User
            {
                UserName = userRequestModel.Email,
                Password = userRequestModel.Password,
                Email = userRequestModel.UserName,
                UserPosition = UserPosition.Customer,
                UserRole = UserRole.Manager,
                IsActive = true
            };
        }
    }
}