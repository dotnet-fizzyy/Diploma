using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Core.Entities;

namespace WebAPI.Core.Interfaces.Database
{
    public interface IUserRepository : IBaseCrudRepository<User>
    {
        Task<List<User>> GetUsersByNameTitle(string term, Guid workSpaceId);
        
        Task<User> AuthenticateUser(User user);

        Task UpdateUserAvatarLinkAsync(User user);

        Task UpdateUserPasswordAsync(User user);
        
        Task UpdateUserWorkSpace(User user);
        
        Task ChangeUserActivityStatusAsync(User user);
    }
}