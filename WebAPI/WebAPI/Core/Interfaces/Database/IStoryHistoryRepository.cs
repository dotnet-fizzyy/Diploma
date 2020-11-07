using System;
using System.Threading.Tasks;
using WebAPI.Core.Entities;

namespace WebAPI.Core.Interfaces.Database
{
    public interface IStoryHistoryRepository : IBaseCrudRepository<StoryHistory>
    {
        Task DeleteStorySoft(Guid storyId);
    }
}