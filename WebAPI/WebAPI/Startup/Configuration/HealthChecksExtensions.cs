using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using WebAPI.Core.Entities;
using WebAPI.Infrastructure.Postgres;

namespace WebAPI.Startup.Configuration
{
    public static class HealthChecksExtensions
    {
        public static void RegisterHealthChecks(this IServiceCollection services)
        {
            services.AddHealthChecks().AddDbContextCheck<DatabaseContext>();
        }
        
        public static void RegisterHealthChecks(this IApplicationBuilder app)
        {
            app.UseHealthChecks("/health-check", new HealthCheckOptions
            {
                ResponseWriter = async (context, report) =>
                {
                    context.Response.ContentType = "application/json";

                    var healthCheckResponse = new HealthCheckResponse
                    {
                        Status = report.Status.ToString(),
                        Duration = report.TotalDuration,
                        HealthCheckComponents = report.Entries.Select(x => new HealthCheckComponent
                        {
                            Status = x.Value.Status.ToString(),
                            Component = x.Key,
                        })
                    };

                    await context.Response.WriteAsync(JsonConvert.SerializeObject(healthCheckResponse));
                }
            });
        }
    }
}