using System.Threading.Tasks;
using WebAPI.Core.Models;
using WebAPI.Models.Models.Pages;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IPageService
    {
        Task<WorkSpacePage> GetUserWorkSpacePageData(UserClaims user);
    }
}