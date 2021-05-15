using System;
using System.Threading.Tasks;
using WebAPI.Models.Models.Result;
using WebAPI.Presentation.Models;
using WebAPI.Presentation.Models.Action;

namespace WebAPI.Core.Interfaces.Providers
{
    public interface IUserProvider
    {
        Task<FullUser> GetFullUser(Guid userId);

        Task<FullUser> GetFullUser(SignInUser signInUser);
    }
}