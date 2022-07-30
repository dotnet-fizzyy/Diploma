using System;
using System.Threading.Tasks;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface ISprintService
    {
        Task<CollectionResponse<FullSprint>> GetAllSprintsFromEpicAsync(Guid epicId, Guid? teamId);
        
        Task<Sprint> GetByIdAsync(Guid id);
        
        Task<FullSprint> GetFullSprintAsync(Guid id);

        Task<Sprint> CreateAsync(Sprint sprint);
        
        Task<Sprint> UpdateAsync(Sprint sprint);

        Task SoftRemoveAsync(Guid id);
        
        Task RemoveAsync(Guid id);
    }
}