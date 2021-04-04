using System;
using System.Threading.Tasks;
using WebAPI.Models.Models;
using WebAPI.Models.Models.Authentication;
using WebAPI.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IUserService
    {
        Task<CollectionResponse<User>> GetAllUsers();

        Task<FullUser> GetUserByToken(Guid id);
        
        Task<User> GetUser(Guid id);

        Task<User> CreateUser(User user);

        Task<User> CreateCustomer(SignUpUser user);

        Task<User> UpdateUser(User user);

        Task UpdateUserPasswordAsync(Guid userId, PasswordUpdate passwordUpdate);
        
        Task UpdateUserAvatarAsync(User user);
        
        Task DeactivateUser(User user);

        Task RemoveUser(Guid id);
    }
}