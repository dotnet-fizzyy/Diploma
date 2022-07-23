using System;
using System.Threading.Tasks;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface ISprintService
    {
        Task<CollectionResponse<FullSprint>> GetAllSprintsFromEpicAsync(Guid epicId, Guid? teamId);
        
        Task<Sprint> GetByIdAsync(Guid sprintId);
        
        Task<FullSprint> GetFullSprintAsync(Guid sprintId);

        Task<Sprint> CreateAsync(Sprint sprint);
        
        Task<Sprint> UpdateAsync(Sprint sprint);

        Task SoftRemoveAsync(Sprint sprint);
        
        Task RemoveAsync(Guid sprintId);
    }
}