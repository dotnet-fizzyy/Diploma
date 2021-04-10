using System;
using System.Threading.Tasks;
using WebAPI.Models.Models;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IWorkSpaceService
    {
        Task<CollectionResponse<WorkSpace>> GetAllWorkSpacesAsync();

        Task<WorkSpace> GetWorkSpaceByIdAsync(Guid workSpaceId);
        
        Task<WorkSpace> GetUserWorkSpaceAsync(Guid userId);

        Task<WorkSpace> CreateWorkSpaceAsync(WorkSpace workSpace);
        
        Task<WorkSpace> CreateWorkSpaceWithUserAsync(WorkSpace workSpace, Guid userId);
        
        Task<WorkSpace> UpdateWorkSpaceAsync(WorkSpace workSpace);
        
        Task RemoveWorkSpaceAsync(Guid workSpaceId);
    }
}