using System;
using System.Threading.Tasks;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;
using WebAPI.Presentation.Models.Action;
using WebAPI.Presentation.Models.Response;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IUserService
    {
        Task<FullUser> GetFullUserAsync(Guid id);
        
        Task<User> GetUserByIdAsync(Guid id);

        Task<User> CreateUserAsync(User user);

        Task<User> CreateUserWithTeamAsync(User user, Guid teamId);

        Task<User> CreateCustomerAsync(SignUpUser user);

        Task<User> UpdateUserAsync(User user);

        Task<EmailResponseModel> CheckForEmailExistenceAsync(string email);
        
        Task UpdateUserPasswordAsync(Guid userId, PasswordUpdate passwordUpdate);
        
        Task UpdateUserAvatarAsync(User user);
        
        Task ChangeUserActivityStatusAsync(User user);

        Task RemoveUserAsync(Guid id);
    }
}