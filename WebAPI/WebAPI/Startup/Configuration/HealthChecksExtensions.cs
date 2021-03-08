using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using WebAPI.Core.Configuration;
using WebAPI.Infrastructure.Postgres;

namespace WebAPI.Startup.Configuration
{
    public static class HealthChecksExtensions
    {
        public static void RegisterHealthChecks(this IServiceCollection services, RedisSettings redisSettings)
        {
            services
                .AddHealthChecks()
                .AddDbContextCheck<DatabaseContext>()
                .AddRedis(redisSettings.ConnectionString);
        }
        
        public static void RegisterHealthChecks(this IApplicationBuilder app)
        {
            app.UseHealthChecks("/health-check");
        }
    }
}