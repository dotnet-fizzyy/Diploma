using System;
using System.Threading.Tasks;
using WebAPI.Models.Basic;
using WebAPI.Models.Complete;
using WebAPI.Models.Extensions;

namespace WebAPI.Core.Interfaces.Services
{
    public interface ISprintService
    {
        Task<CollectionResponse<SprintComplete>> GetAllSprintsFromEpicAsync(Guid epicId, Guid? teamId);
        
        Task<Sprint> GetByIdAsync(Guid id);
        
        Task<SprintComplete> GetFullSprintAsync(Guid id);

        Task<Sprint> CreateAsync(Sprint sprint);
        
        Task<Sprint> UpdateAsync(Sprint sprint);

        Task SoftRemoveAsync(Guid id);
        
        Task RemoveAsync(Guid id);
    }
}