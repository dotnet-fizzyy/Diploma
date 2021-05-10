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
using WebAPI.Models.Models.Authentication;
using WebAPI.Models.Models.Models;
using WebAPI.Presentation.Aggregators;
using WebAPI.Presentation.Mappers;
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
            services.AddTransient<IEpicRepository, EpicRepository>();
            services.AddTransient<ISprintRepository, SprintRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IRefreshTokenRepository, RefreshTokenRepository>();
            services.AddTransient<ITeamRepository, TeamRepository>();
            services.AddTransient<IProjectRepository, ProjectRepository>();
            services.AddTransient<IStoryHistoryRepository, StoryHistoryRepository>();
            services.AddTransient<IStoryRepository, StoryRepository>();
            services.AddTransient<IWorkSpaceRepository, WorkSpaceRepository>();
            
            //Mappers
            services.AddTransient<IStoryMapper, StoryMapper>();
            services.AddTransient<IRefreshTokenMapper, RefreshTokenMapper>();
            services.AddTransient<IEpicMapper, EpicMapper>();
            services.AddTransient<IUserMapper, UserMapper>();
            services.AddTransient<IStoryHistoryMapper, StoryHistoryMapper>();
            services.AddTransient<ISprintMapper, SprintMapper>();
            services.AddTransient<ITeamMapper, TeamMapper>();
            services.AddTransient<IProjectMapper, ProjectMapper>();
            services.AddTransient<IWorkSpaceMapper, WorkSpaceMapper>();
            
            //Services
            services.AddTransient<IStoryService, StoryService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<ITeamService, TeamService>();
            services.AddTransient<IProjectService, ProjectService>();
            services.AddTransient<ISprintService, SprintService>();
            services.AddTransient<IEpicService, EpicService>();
            services.AddTransient<ITokenGenerator, TokenGenerator>();
            services.AddTransient<IPageService, PageService>();
            services.AddTransient<IWorkSpaceService, WorkSpaceService>();

            //Providers
            services.AddTransient<IUserProvider, UserProvider>();
            
            //Utilities
            services.AddTransient<IClaimsReader, ClaimsReader>();
            services.AddTransient<ITokenService, TokenService>();
            
            //Aggregators
            services.AddTransient<IFullProjectDescriptionAggregator, FullProjectDescriptionAggregator>();
            services.AddTransient<IStoryAggregator, StoryAggregator>();
            services.AddTransient<IRefreshTokenAggregator, RefreshTokenAggregator>();
            services.AddTransient<IPageAggregator, PageAggregator>();

            //Validators
            services.AddTransient<IValidator<SignUpUser>, SignUpUserValidator>();
            services.AddTransient<IValidator<SignInUser>, SignInUserValidator>();
            services.AddTransient<IValidator<User>, UserValidator>();
            services.AddTransient<IValidator<Story>, StoryValidator>();
            services.AddTransient<IValidator<Team>, TeamValidator>();
            services.AddTransient<IValidator<Epic>, EpicValidator>();
            services.AddTransient<IValidator<Sprint>, SprintValidator>();
            services.AddTransient<IValidator<Project>, ProjectValidator>();
            services.AddTransient<IValidator<WorkSpace>, WorkSpaceValidator>();
        }
    }
}