using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Models;

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
                    context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                    context.Response.ContentType = "application/json";
                    
                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();

                    if (contextFeature != null)
                    {
                        var exceptionResponse = new ExceptionResponse
                        {
                            Status = "Internal Server Error",
                            Message = contextFeature.Error.Message
                        };
                        
                        switch (contextFeature.Error)
                        {
                            case UserFriendlyException userFriendlyException:
                                switch (userFriendlyException.ErrorStatus)
                                {
                                    case ErrorStatus.NOT_FOUND:
                                        context.Response.StatusCode = StatusCodes.Status404NotFound;
                                        break;
                                    case ErrorStatus.INVALID_DATA:
                                        context.Response.StatusCode = StatusCodes.Status400BadRequest;
                                        break;
                                }
                                
                                exceptionResponse.Status = userFriendlyException.ErrorStatus.ToString();

                                break;
                        }
                        
                        logger.LogError($"Error caught in global handler: ${exceptionResponse.Message}");
                        
                        await context.Response.WriteAsync($@"
                            {{
                                ""errors"": [
                                    ""code"":""API_server_error"",
                                    ""status"": ""{exceptionResponse.Status}"",
                                    ""message"":""{exceptionResponse.Message}""
                                ]
                            }}
                        ");
                    }
                });
            });
        }
    }
}