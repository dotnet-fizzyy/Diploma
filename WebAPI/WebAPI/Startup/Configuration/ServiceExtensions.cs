using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using WebAPI.ApplicationLogic;
using WebAPI.ApplicationLogic.Services;
using WebAPI.Core.Configuration;
using WebAPI.Core.Interfaces.Aggregators;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Infrastructure.Postgres.Repository;
using WebAPI.Models.Models;
using WebAPI.Presentation.Aggregators;
using WebAPI.Presentation.Filters;
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
            
            //Mappers
            services.AddTransient<IStoryMapper, StoryMapper>();
            services.AddTransient<IRefreshTokenMapper, RefreshTokenMapper>();
            services.AddTransient<IEpicMapper, EpicMapper>();
            services.AddTransient<IUserMapper, UserMapper>();
            services.AddTransient<IStoryHistoryMapper, StoryHistoryMapper>();
            services.AddTransient<ISprintMapper, SprintMapper>();
            services.AddTransient<ITeamMapper, TeamMapper>();
            services.AddTransient<IProjectMapper, ProjectMapper>();
            
            //Services
            services.AddTransient<IStoryService, StoryService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<ITeamService, TeamService>();
            services.AddTransient<IProjectService, ProjectService>();
            services.AddTransient<ISprintService, SprintService>();
            services.AddTransient<IRefreshTokenService, RefreshTokenService>();
            services.AddTransient<IEpicService, EpicService>();
            services.AddTransient<ITokenService, TokenService>();
            services.AddTransient<IStorySortingAndFiltering, StorySortingAndFiltering>();
            services.AddTransient<ITokenGenerator, TokenGenerator>();
            
            //Aggregators
            services.AddTransient<IFullProjectDescriptionAggregator, FullProjectDescriptionAggregator>();
            services.AddTransient<IStoryAggregator, StoryAggregator>();
            services.AddTransient<IRefreshTokenAggregator, RefreshTokenAggregator>();
            
            //Filters
            services.AddTransient<UserAuthorizationFilter>();
            
            //Validators
            services.AddTransient<IValidator<AuthenticationUser>, AuthenticationUserValidator>();
            services.AddTransient<IValidator<User>, UserValidator>();
        }
    }
}