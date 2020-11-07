using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;

namespace WebAPI.Startup.Configuration
{
    public static class ExceptionHandlerExtensions
    {
        public static void RegisterExceptionHandler(this IApplicationBuilder app)
        {
            /*app.UseExceptionHandler(appError =>
            {
                app.Run(async context =>
                {
                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();

                    if (contextFeature != null)
                    {
                        await context.Response.WriteAsync("Error: " + contextFeature.Error.Message);
                    }
                });
            });*/
        }
    }
}