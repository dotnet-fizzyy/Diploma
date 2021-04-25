using System;
using System.Threading.Tasks;
using WebAPI.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IProjectService
    {
        Task<CollectionResponse<Project>> GetAllProjects();

        Task<Project> GetProject(Guid projectId);

        Task<FullProjectDescription> GetFullProjectDescription(Guid projectId);

        Task<Project> AddProject(Project project);

        Task<Project> UpdateProject(Project project);

        Task RemoveProject(Guid projectId);
    }
}