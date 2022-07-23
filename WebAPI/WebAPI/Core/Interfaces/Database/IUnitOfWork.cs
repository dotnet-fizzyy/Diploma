using System.Threading.Tasks;

namespace WebAPI.Core.Interfaces.Database
{
    public interface IUnitOfWork
    {
        IWorkSpaceRepository WorkSpaceRepository { get; }
     
        IProjectRepository ProjectRepository { get; }
        
        IEpicRepository EpicRepository { get; }

        ISprintRepository SprintRepository { get; }
        
        IStoryRepository StoryRepository { get; }
        
        IStoryHistoryRepository StoryHistoryRepository { get; }
        
        IRefreshTokenRepository RefreshTokenRepository { get; }
        
        ITeamRepository TeamRepository { get; }
        
        IUserRepository UserRepository { get; }
        
        Task CommitAsync();
    }
}