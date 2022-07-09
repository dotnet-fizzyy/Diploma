using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using WebAPI.ApplicationLogic.Providers;
using WebAPI.ApplicationLogic.Services;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Configuration;
using WebAPI.Core.Interfaces.Aggregators;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Core.Interfaces.Providers;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Core.Interfaces.Utilities;
using WebAPI.Infrastructure.Postgres.Repository;
using WebAPI.Infrastructure.Redis;
using WebAPI.Models.Models.Models;
using WebAPI.Presentation.Aggregators;
using WebAPI.Presentation.Mappers;
using WebAPI.Presentation.Models.Action;
using WebAPI.Presentation.Validators;

namespace WebAPI.Startup.Configuration
{
    public static class ServiceExtensions
    {
        public static void RegisterServices(this IServiceCollection services, AppSettings appSettings)
        {
            //AppSettings
            services.AddSingleton(appSettings);
            
            //Infrastructure
            services.AddScoped<IEpicRepository, EpicRepository>();
            services.AddScoped<ISprintRepository, SprintRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
            services.AddScoped<ITeamRepository, TeamRepository>();
            services.AddScoped<IProjectRepository, ProjectRepository>();
            services.AddScoped<IStoryHistoryRepository, StoryHistoryRepository>();
            services.AddScoped<IStoryRepository, StoryRepository>();
            services.AddScoped<IWorkSpaceRepository, WorkSpaceRepository>();
            services.AddScoped<IRedisContext, RedisContext>();
            
            //Mappers
            services.AddSingleton<IEpicMapper, EpicMapper>();
            services.AddSingleton<IUserMapper, UserMapper>();
            services.AddSingleton<ISprintMapper, SprintMapper>();
            services.AddSingleton<ITeamMapper, TeamMapper>();
            services.AddSingleton<IProjectMapper, ProjectMapper>();
            services.AddSingleton<IWorkSpaceMapper, WorkSpaceMapper>();
            
            //Services
            services.AddScoped<IStoryService, StoryService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ITeamService, TeamService>();
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<ISprintService, SprintService>();
            services.AddScoped<IEpicService, EpicService>();
            services.AddScoped<IPageService, PageService>();
            services.AddScoped<IWorkSpaceService, WorkSpaceService>();

            //Providers
            services.AddScoped<IUserProvider, UserProvider>();
            
            //Utilities
            services.AddSingleton<IClaimsReader, ClaimsReader>();
            services.AddSingleton<ITokenService, TokenService>();
            
            //Aggregators
            services.AddSingleton<IFullProjectDescriptionAggregator, FullProjectDescriptionAggregator>();
            services.AddSingleton<IPageAggregator, PageAggregator>();

            //Validators
            services.AddSingleton<IValidator<SignUpUser>, SignUpUserValidator>();
            services.AddSingleton<IValidator<SignInUser>, SignInUserValidator>();
            services.AddSingleton<IValidator<User>, UserValidator>();
            services.AddSingleton<IValidator<Story>, StoryValidator>();
            services.AddSingleton<IValidator<Team>, TeamValidator>();
            services.AddSingleton<IValidator<Epic>, EpicValidator>();
            services.AddSingleton<IValidator<Sprint>, SprintValidator>();
            services.AddSingleton<IValidator<Project>, ProjectValidator>();
            services.AddSingleton<IValidator<WorkSpace>, WorkSpaceValidator>();
        }
    }
}