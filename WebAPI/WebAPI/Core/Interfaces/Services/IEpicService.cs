using System;
using System.Threading.Tasks;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IEpicService
    {
        Task<CollectionResponse<Epic>> GetEpicsFromProjectAsync(Guid projectId);
        
        Task<Epic> GetByIdAsync(Guid id);

        Task<FullEpic> GetFullDescriptionAsync(Guid id);
        
        Task<Epic> CreateAsync(Epic epic);

        Task<Epic> UpdateAsync(Epic epic);

        Task SoftRemoveAsync(Guid id);
        
        Task RemoveAsync(Guid id);
    }
}