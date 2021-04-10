using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace WebAPI.Startup.Configuration
{
    public class LoggingMiddleware
    {
        private readonly ILogger<LoggingMiddleware> _logger;
        private readonly RequestDelegate _next;

        public LoggingMiddleware(ILogger<LoggingMiddleware> logger, RequestDelegate next)
        {
            _logger = logger;
            _next = next;
        }
        
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                context.Request.EnableBuffering();
                var jsonBody = string.Empty;

                if (context.Request != null && context.Request.Body != null)
                {
                    context.Request.EnableBuffering();
                    jsonBody = await new StreamReader(context.Request.Body).ReadToEndAsync();
                    context.Request.Body.Position = 0;
                }
                
                _logger.LogInformation($"Request {context.Request?.Method} {context.Request?.Path.Value} {jsonBody} => {context.Response?.StatusCode}");
            }
            finally
            {
                await _next(context);
            }
        }  
    }
}