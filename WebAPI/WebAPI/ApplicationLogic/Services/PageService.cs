using System.Threading.Tasks;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Core.Models;
using WebAPI.Models.Models;
using WebAPI.Models.Result;

namespace WebAPI.ApplicationLogic.Services
{
    public class PageService : IPageService
    {
        private readonly IProjectService _projectService;
        
        public PageService(IProjectService projectService)
        {
            _projectService = projectService;
        }
        
        public async Task<CollectionResponse<Project>> GetUserProjects(UserClaims user)
        {
            return await _projectService.GetUserProjects(user);
        }
    }
}