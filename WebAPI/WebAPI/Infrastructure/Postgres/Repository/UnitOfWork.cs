using System;
using System.Threading.Tasks;
using WebAPI.Core.Interfaces.Database;

namespace WebAPI.Infrastructure.Postgres.Repository
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly DatabaseContext _databaseContext;
        
        public UnitOfWork(DatabaseContext databaseContext)
        {
            WorkSpaceRepository = new WorkSpaceRepository(databaseContext);
            ProjectRepository = new ProjectRepository(databaseContext);
            EpicRepository = new EpicRepository(databaseContext);
            SprintRepository = new SprintRepository(databaseContext);
            StoryRepository = new StoryRepository(databaseContext);
            StoryHistoryRepository = new StoryHistoryRepository(databaseContext);
            RefreshTokenRepository = new RefreshTokenRepository(databaseContext);
            TeamRepository = new TeamRepository(databaseContext);
            UserRepository = new UserRepository(databaseContext);

            _databaseContext = databaseContext;
        }

        public IWorkSpaceRepository WorkSpaceRepository { get; }
        
        public IProjectRepository ProjectRepository { get; }

        public IEpicRepository EpicRepository { get; }
        
        public ISprintRepository SprintRepository { get; }
        
        public IStoryRepository StoryRepository { get; }
        
        public IStoryHistoryRepository StoryHistoryRepository { get; }
        
        public IRefreshTokenRepository RefreshTokenRepository { get; }
        
        public ITeamRepository TeamRepository { get; }
        
        public IUserRepository UserRepository { get; }

        public async Task CommitAsync()
        {
            await _databaseContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            _databaseContext?.Dispose();
        }
    }
}