using System;
using System.Threading.Tasks;
using WebAPI.Models.Models;
using WebAPI.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IEpicService
    {
        Task<CollectionResponse<Epic>> GetEpics();
        
        Task<CollectionResponse<Epic>> GetEpicsFromProject(Guid projectId);
        
        Task<Epic> GetEpic(Guid epicId);

        Task<FullEpic> GetFullEpicDescription(Guid epicId);
        
        Task<Epic> CreateEpic(Epic epic);

        Task<Epic> UpdateEpic(Epic epic);
        
        Task RemoveEpic(Guid epicId);
    }
}