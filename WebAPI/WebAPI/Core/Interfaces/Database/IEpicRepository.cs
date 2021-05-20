using System;
using System.Threading.Tasks;
using WebAPI.Core.Entities;

namespace WebAPI.Core.Interfaces.Database
{
    public interface IEpicRepository : IBaseCrudRepository<Epic>
    {
        Task DeleteSoftAsync(Guid epicId);
    }
}