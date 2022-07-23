using System;
using System.Threading.Tasks;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IProjectService
    {
        Task<Project> GetByIdAsync(Guid projectId);

        Task<FullProjectDescription> GetFullDescriptionAsync(Guid projectId);

        Task<Project> CreateAsync(Project projectModelToCreate);

        Task<Project> UpdateAsync(Project project);
        
        Task SoftRemoveAsync(Project project);
        
        Task RemoveAsync(Guid projectId);
    }
}