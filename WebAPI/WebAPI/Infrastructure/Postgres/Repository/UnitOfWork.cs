using System;
using System.Threading.Tasks;
using WebAPI.Core.Interfaces.Database;

namespace WebAPI.Infrastructure.Postgres.Repository
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly DatabaseContext _databaseContext;

        private readonly WorkSpaceRepository _workSpaceRepository;
        private readonly ProjectRepository _projectRepository;
        private readonly EpicRepository _epicRepository;
        private readonly SprintRepository _sprintRepository;
        private readonly StoryRepository _storyRepository;
        private readonly StoryHistoryRepository _storyHistoryRepository;
        private readonly RefreshTokenRepository _refreshTokenRepository;
        private readonly TeamRepository _teamRepository;
        private readonly UserRepository _userRepository;

        public UnitOfWork(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public IWorkSpaceRepository WorkSpaceRepository => GetRepositoryInstance(_workSpaceRepository);

        public IProjectRepository ProjectRepository => GetRepositoryInstance(_projectRepository);

        public IEpicRepository EpicRepository => GetRepositoryInstance(_epicRepository);
        
        public ISprintRepository SprintRepository => GetRepositoryInstance(_sprintRepository);

        public IStoryRepository StoryRepository => GetRepositoryInstance(_storyRepository);
        
        public IStoryHistoryRepository StoryHistoryRepository => GetRepositoryInstance(_storyHistoryRepository);
        
        public IRefreshTokenRepository RefreshTokenRepository => GetRepositoryInstance(_refreshTokenRepository);
        
        public ITeamRepository TeamRepository => GetRepositoryInstance(_teamRepository);

        public IUserRepository UserRepository => GetRepositoryInstance(_userRepository);

        public async Task CommitAsync()
        {
            await _databaseContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            _databaseContext?.Dispose();
        }

        private T GetRepositoryInstance<T>(T instance) where T : class =>
            instance ??= (T)Activator.CreateInstance(typeof(T), _databaseContext);
    }
}