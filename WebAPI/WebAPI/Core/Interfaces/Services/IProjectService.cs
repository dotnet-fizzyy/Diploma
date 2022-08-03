using System;
using System.Threading.Tasks;
using WebAPI.Models.Basic;
using WebAPI.Models.Complete;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IProjectService
    {
        Task<Project> GetByIdAsync(Guid id);

        Task<ProjectComplete> GetFullDescriptionAsync(Guid id);

        Task<Project> CreateAsync(Project projectModelToCreate);

        Task<Project> UpdateAsync(Project project);
        
        Task SoftRemoveAsync(Guid id);
        
        Task RemoveAsync(Guid id);
    }
}