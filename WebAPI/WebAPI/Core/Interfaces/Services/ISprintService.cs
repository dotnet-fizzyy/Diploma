using System;
using System.Threading.Tasks;
using WebAPI.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface ISprintService
    {
        Task<CollectionResponse<Sprint>> GetALlSprints();

        Task<CollectionResponse<FullSprint>> GetAllSprintsFromEpic(Guid epicId, Guid userId);
        
        Task<Sprint> GetSprint(Guid sprintId);
        
        Task<FullSprint> GetFullSprint(Guid sprintId);

        Task<Sprint> CreateSprint(Sprint sprint);
        
        Task<Sprint> UpdateSprint(Sprint sprint);

        Task RemoveSprint(Guid sprintId);
    }
}