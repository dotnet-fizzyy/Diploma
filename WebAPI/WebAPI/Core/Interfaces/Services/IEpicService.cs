using System;
using System.Threading.Tasks;
using WebAPI.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IEpicService
    {
        Task<CollectionResponse<Epic>> GetEpicsAsync();
        
        Task<CollectionResponse<Epic>> GetEpicsFromProjectAsync(Guid projectId);
        
        Task<Epic> GetEpicByIdAsync(Guid epicId);

        Task<FullEpic> GetFullEpicDescriptionAsync(Guid epicId);
        
        Task<Epic> CreateEpicAsync(Epic epic);

        Task<Epic> UpdateEpicAsync(Epic epic);
        
        Task RemoveEpicAsync(Guid epicId);
    }
}