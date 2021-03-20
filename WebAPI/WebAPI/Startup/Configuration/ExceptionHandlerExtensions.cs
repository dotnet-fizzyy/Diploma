using System.Net;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;

namespace WebAPI.Startup.Configuration
{
    public static class ExceptionHandlerExtensions
    {
        public static void RegisterExceptionHandler(this IApplicationBuilder app, ILogger logger)
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
                        switch (contextFeature.Error)
                        {
                            case UserFriendlyException userFriendlyException:
                                switch (userFriendlyException.ErrorStatus)
                                {
                                    case ErrorStatus.NOT_FOUND:
                                        context.Response.StatusCode = StatusCodes.Status400BadRequest;
                                        break;
                                    case ErrorStatus.INVALID_DATA:
                                        context.Response.StatusCode = StatusCodes.Status400BadRequest;
                                        break;
                                }
                                
                                break;
                        }
                        
                        logger.LogError($"Error caught in global handler: ${contextFeature.Error.Message}");
                        
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