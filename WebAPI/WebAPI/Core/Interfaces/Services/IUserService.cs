using System;
using System.Threading.Tasks;
using WebAPI.Models.Models;
using WebAPI.Models.Models.Authentication;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IUserService
    {
        Task<CollectionResponse<User>> GetAllUsersAsync();

        Task<FullUser> GetFullUserAsync(Guid id);
        
        Task<User> GetUserByIdAsync(Guid id);

        Task<User> CreateUserAsync(User user);

        Task<User> CreateUserWithTeamAsync(User user, Guid teamId);

        Task<User> CreateCustomerAsync(SignUpUser user);

        Task<User> UpdateUserAsync(User user);

        Task UpdateUserPasswordAsync(Guid userId, PasswordUpdate passwordUpdate);
        
        Task UpdateUserAvatarAsync(User user);
        
        Task ChangeUserActivityStatusAsync(User user);

        Task RemoveUserAsync(Guid id);
    }
}