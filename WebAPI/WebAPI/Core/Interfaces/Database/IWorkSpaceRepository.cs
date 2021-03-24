using System;
using System.Threading.Tasks;
using WebAPI.Core.Entities;

namespace WebAPI.Core.Interfaces.Database
{
    public interface IWorkSpaceRepository : IBaseCrudRepository<WorkSpace>
    {
        Task<WorkSpace> GetUserWorkSpaceAsync(Guid userId);
    }
}