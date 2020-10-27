using System.Threading.Tasks;
using WebAPI.Core.Entities;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IStoryService
    {
        Task<Story> AddStory(WebAPI.Models.Models.Story story);
    }
}