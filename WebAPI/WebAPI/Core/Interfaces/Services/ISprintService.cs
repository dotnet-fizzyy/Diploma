using System;
using System.Threading.Tasks;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface ISprintService
    {
        Task<CollectionResponse<FullSprint>> GetAllSprintsFromEpicAsync(Guid epicId, Guid? teamId);
        
        Task<Sprint> GetSprintByIdAsync(Guid sprintId);
        
        Task<FullSprint> GetFullSprintAsync(Guid sprintId);

        Task<Sprint> CreateSprintAsync(Sprint sprint);
        
        Task<Sprint> UpdateSprintAsync(Sprint sprint);

        Task RemoveSprintSoftAsync(Sprint sprint);
        
        Task RemoveSprintAsync(Guid sprintId);
    }
}