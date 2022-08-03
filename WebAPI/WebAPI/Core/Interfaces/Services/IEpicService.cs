using System;
using System.Threading.Tasks;
using WebAPI.Models.Basic;
using WebAPI.Models.Complete;
using WebAPI.Models.Extensions;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IEpicService
    {
        Task<CollectionResponse<Epic>> GetEpicsFromProjectAsync(Guid projectId);
        
        Task<Epic> GetByIdAsync(Guid id);

        Task<EpicComplete> GetFullDescriptionAsync(Guid id);
        
        Task<Epic> CreateAsync(Epic epic);

        Task<Epic> UpdateAsync(Epic epic);

        Task SoftRemoveAsync(Guid id);
        
        Task RemoveAsync(Guid id);
    }
}