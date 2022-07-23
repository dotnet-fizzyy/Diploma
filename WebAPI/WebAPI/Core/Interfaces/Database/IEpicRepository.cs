using System;
using WebAPI.Core.Entities;

namespace WebAPI.Core.Interfaces.Database
{
    public interface IEpicRepository : IBaseCrudRepository<Epic>
    {
        void SoftRemove(Guid epicId);
    }
}