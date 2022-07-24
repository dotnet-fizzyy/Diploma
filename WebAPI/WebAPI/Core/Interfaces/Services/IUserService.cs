using System;
using System.Threading.Tasks;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;
using WebAPI.Presentation.Models.Request;
using WebAPI.Presentation.Models.Response;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IUserService
    {
        Task<FullUser> GetFullDescriptionByIdAsync(Guid userId);
        
        Task<User> GetByIdAsync(Guid id);

        Task<AuthenticationUserResponseModel> AuthenticateUserAsync(SignInUserRequestModel signInUser);
        
        Task<User> CreateAsync(User user);

        Task<User> CreateUserWithTeamAsync(User user, Guid teamId);

        Task<User> CreateCustomerAsync(SignUpUserRequestModel userRequestModel);

        Task<User> UpdateAsync(User user);

        Task<EmailResponseModel> CheckEmailExistenceAsync(string email);
        
        Task UpdatePasswordAsync(Guid userId, PasswordUpdateRequestModel passwordUpdateRequestModel);
        
        Task UpdateAvatarAsync(User user);
        
        Task ChangeActivityStatusAsync(User user);

        Task RemoveAsync(Guid id);
    }
}