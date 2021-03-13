using System;
using System.Threading.Tasks;
using WebAPI.Models.Models;
using WebAPI.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IUserService
    {
        Task<CollectionResponse<User>> GetAllUsers();

        Task<User> GetUser(Guid id);

        Task<User> CreateUser(User user);

        Task<User> CreateCustomer(AuthenticationUser user);

        Task<User> UpdateUser(User user);

        Task DeactivateUser(User user);

        Task RemoveUser(Guid id);
    }
}