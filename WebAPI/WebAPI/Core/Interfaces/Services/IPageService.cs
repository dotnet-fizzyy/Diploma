using System;
using System.Threading.Tasks;
using WebAPI.Core.Models;
using WebAPI.Models.Models.Pages;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IPageService
    {
        Task<FullTeam> GetTeamPageData(Guid teamId); 
        
        Task<ProjectPage> GetProjectPageData(Guid projectId);

        Task<WorkSpacePage> GetUserWorkSpacePageData(UserClaims user);
    }
}