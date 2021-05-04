using System;
using System.Threading.Tasks;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IProjectService
    {
        Task<CollectionResponse<Project>> GetAllProjectsAsync();

        Task<Project> GetProjectAsync(Guid projectId);

        Task<FullProjectDescription> GetFullProjectDescriptionAsync(Guid projectId);

        Task<Project> CreateProjectAsync(Project project);

        Task<Project> UpdateProjectAsync(Project project);

        Task RemoveProjectAsync(Guid projectId);
    }
}