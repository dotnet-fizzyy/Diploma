using System;
using System.Threading.Tasks;
using WebAPI.Models.Models.Authentication;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Providers
{
    public interface IUserProvider
    {
        Task<FullUser> GetFullUser(Guid userId);

        Task<FullUser> GetFullUser(SignInUser signInUser);
    }
}