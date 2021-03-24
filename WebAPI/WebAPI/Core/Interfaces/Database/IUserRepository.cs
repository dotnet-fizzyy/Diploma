using System;
using System.Threading.Tasks;
using WebAPI.Core.Entities;

namespace WebAPI.Core.Interfaces.Database
{
    public interface IUserRepository : IBaseCrudRepository<User>
    {
        Task<User> AuthenticateUser(User user);

        Task UpdateUserWorkSpace(User user);
        
        Task DeactivateUser(User user);
    }
}