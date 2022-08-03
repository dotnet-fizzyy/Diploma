using System;
using System.Threading.Tasks;
using WebAPI.Models.Basic;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IWorkSpaceService
    {
        Task<WorkSpace> GetByIdAsync(Guid workSpaceId);
        
        Task<WorkSpace> GetUsersWorkSpaceAsync(Guid userId);

        Task<WorkSpace> CreateAsync(WorkSpace workSpace);
        
        Task<WorkSpace> CreateWithUserAsync(WorkSpace workSpace, Guid userId);
        
        Task<WorkSpace> UpdateAsync(WorkSpace workSpace);
        
        Task RemoveAsync(Guid workSpaceId);
    }
}