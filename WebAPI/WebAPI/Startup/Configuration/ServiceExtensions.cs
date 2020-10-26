using Microsoft.Extensions.DependencyInjection;
using WebAPI.Core.Configuration;

namespace WebAPI.Startup.Configuration
{
    public static class ServiceExtensions
    {
        public static void RegisterServices(this IServiceCollection services, AppSettings appSettings)
        {
            services.AddSingleton(appSettings);
        }
    }
}