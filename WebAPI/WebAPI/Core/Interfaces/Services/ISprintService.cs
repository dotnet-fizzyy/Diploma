using System;
using System.Threading.Tasks;
using WebAPI.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface ISprintService
    {
        Task<CollectionResponse<Sprint>> GetALlSprintsAsync();

        Task<CollectionResponse<FullSprint>> GetAllSprintsFromEpicAsync(Guid epicId, Guid userId);
        
        Task<Sprint> GetSprintByIdAsync(Guid sprintId);
        
        Task<FullSprint> GetFullSprintAsync(Guid sprintId);

        Task<Sprint> CreateSprintAsync(Sprint sprint);
        
        Task<Sprint> UpdateSprintAsync(Sprint sprint);

        Task RemoveSprintAsync(Guid sprintId);
    }
}