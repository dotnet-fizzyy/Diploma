using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WebAPI.Core.Configuration;
using WebAPI.Infrastructure.Postgres;

namespace WebAPI.Startup.Configuration
{
    public static class DatabaseExtensions
    {
        public static void RegisterDatabase(this IServiceCollection services, DatabaseSettings databaseSettings)
        {
            services.AddDbContext<DatabaseContext>(options =>
                {
                    options.UseNpgsql(databaseSettings.ConnectionString);
                }
        );
    }
    }
}