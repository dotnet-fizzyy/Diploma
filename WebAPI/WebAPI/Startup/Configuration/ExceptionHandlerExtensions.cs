using System.Net;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;

namespace WebAPI.Startup.Configuration
{
    public static class ExceptionHandlerExtensions
    {
        public static void RegisterExceptionHandler(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "application/json";
                    
                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();

                    if (contextFeature != null)
                    {
                        await context.Response.WriteAsync($@"
                            {{
                                ""errors"": [
                                    ""code"":""Wep-API server_error"",
                                    ""status"": ""Internal Server Error"",
                                    ""message"":""{contextFeature.Error.Message}""
                                ]
                            }}
                        ");
                    }
                });
            });
        }
    }
}