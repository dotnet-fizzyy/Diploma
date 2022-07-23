using System.Threading.Tasks;
using WebAPI.Core.Entities;

namespace WebAPI.Core.Interfaces.Database
{
    public interface IUserRepository : IBaseCrudRepository<User>
    {
        Task<User> AuthenticateUser(User authUser);

        Task UpdateUserAvatarLinkAsync(User user);

        Task UpdateUserPasswordAsync(User user);
        
        Task UpdateUserWorkSpace(User user);
        
        Task ChangeUserActivityStatusAsync(User user);
    }
}