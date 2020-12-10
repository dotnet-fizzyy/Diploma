using System;
using System.Threading.Tasks;
using WebAPI.Models.Models;
using WebAPI.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IProjectService
    {
        Task<CollectionResponse<Project>> GetAllProjects();
        
        Task<CollectionResponse<Project>> GetCustomerProjects(Guid userId);

        Task<CollectionResponse<Project>> GetProjectsByUserId(Guid userId);
        
        Task<CollectionResponse<FullProject>> GetProjectsWithTeamsByUserId(Guid userId);
        
        Task<Project> GetProject(Guid projectId);

        Task<FullProjectDescription> GetFullProjectDescription(Guid projectId);
        
        Task<FullProject> GetFullProject(Guid projectId);

        Task<Project> AddProject(Project project);

        Task<Project> UpdateProject(Project project);

        Task RemoveProject(Guid projectId);
    }
}