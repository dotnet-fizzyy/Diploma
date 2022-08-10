using WebAPI.Core.Entities;
using WebAPI.Core.Enums;
using WebAPI.Presentation.Models.Request;

namespace WebAPI.ApplicationLogic.Utilities
{
    public static class UserUtilities
    {
        public static User CreateCustomerEntity(SignUpUserRequestModel userRequestModel) =>
            new User
            {
                UserName = userRequestModel.UserName,
                Password = userRequestModel.Password,
                Email = userRequestModel.Email,
                UserPosition = UserPosition.Customer,
                UserRole = UserRole.Manager,
                IsActive = true
            };
    }
}