using System;
using System.Threading.Tasks;
using WebAPI.Models.Basic;
using WebAPI.Models.Complete;
using WebAPI.Models.Extensions;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IProjectService
    {
        Task<CollectionResponse<Project>> SearchAsync(Guid userId, string searchTerm, int limit, int offset);
        
        Task<Project> GetByIdAsync(Guid id);

        Task<ProjectComplete> GetCompleteDescriptionAsync(Guid id);

        Task<Project> CreateAsync(Project projectToCreate);

        Task<Project> UpdateAsync(Project project);
        
        Task SoftRemoveAsync(Guid id);
        
        Task RemoveAsync(Guid id);
    }
}