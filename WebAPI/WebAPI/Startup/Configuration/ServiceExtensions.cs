using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using WebAPI.ApplicationLogic.Services;
using WebAPI.Core.Configuration;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Infrastructure.Postgres.Repository;
using WebAPI.Infrastructure.Redis;
using WebAPI.Models.Basic;
using WebAPI.Presentation.Models.Request;
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
            services.AddScoped<ICacheContext, CacheContext>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            //Services
            services.AddScoped<IStoryService, StoryService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ITeamService, TeamService>();
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<ISprintService, SprintService>();
            services.AddScoped<IEpicService, EpicService>();
            services.AddScoped<IPageService, PageService>();
            services.AddScoped<IWorkSpaceService, WorkSpaceService>();
            services.AddScoped<ITokenService, TokenService>();

            //Validators
            services.AddSingleton<IValidator<SignUpUserRequestModel>, SignUpUserValidator>();
            services.AddSingleton<IValidator<SignInUserRequestModel>, SignInUserValidator>();
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