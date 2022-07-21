using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using WebAPI.Core.Configuration;
using WebAPI.Infrastructure.Postgres;

namespace WebAPI.Startup.Configuration
{
    public static class DatabaseExtensions
    {
        public static void RegisterDatabase(
            this IServiceCollection services,
            DatabaseSettings databaseSettings,
            ILoggerFactory loggerFactory)
        {
            services.AddDbContext<DatabaseContext>(options =>
                {
                    options.UseNpgsql(databaseSettings.ConnectionString);
                    options.UseLoggerFactory(loggerFactory);
                },
                ServiceLifetime.Transient
            );
        }
    }
}