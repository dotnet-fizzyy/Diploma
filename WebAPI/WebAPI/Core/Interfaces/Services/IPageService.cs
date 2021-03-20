using System.Threading.Tasks;
using WebAPI.Core.Models;
using WebAPI.Models.Models;
using WebAPI.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IPageService
    {
        Task<CollectionResponse<Project>> GetUserProjects(UserClaims user);
    }
}