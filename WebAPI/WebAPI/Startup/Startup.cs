using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using WebAPI.Core.Configuration;
using WebAPI.Presentation.Filters;
using WebAPI.Startup.Configuration;

namespace WebAPI.Startup
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var (databaseSettings, tokenSettings) = RegisterSettings(Configuration);
            var appSettings = new AppSettings
            {
                Database = databaseSettings,
                Token = tokenSettings,
            };

            services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.Converters.Add(new EnumConverter());
            });

            services.AddTransient<UserAuthorizationFilter>();
            
            services.RegisterAuthSettings(tokenSettings);
            services.RegisterServices(appSettings);
            services.RegisterDatabase(databaseSettings);
            services.RegisterHealthChecks();
            services.RegisterSwagger();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory logger)
        {   
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            
            app.RegisterSwaggerUi();
            
            app.RegisterExceptionHandler(logger.CreateLogger("Exceptions"));
            
            app.UseCors(options => options
                .SetIsOriginAllowed(_ => true)
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
            );

            app.RegisterHealthChecks();

            app.UseAuthentication();
            
            app.UseAuthorization();

            app.UseEndpoints(endpoints => endpoints.MapControllers());
        }

        private static (
            DatabaseSettings databaseSettings, 
            TokenSettings tokenSettings
            ) RegisterSettings(IConfiguration configuration)
        {
            var databaseSettings = configuration.GetSection(nameof(AppSettings.Database)).Get<DatabaseSettings>();
            var tokenSettings = configuration.GetSection(nameof(AppSettings.Token)).Get<TokenSettings>();

            return (databaseSettings, tokenSettings);
        }
    }
    
    public class EnumConverter : StringEnumConverter
    {
        public override object ReadJson(JsonReader reader, Type objectType, object existingValue,
            JsonSerializer serializer)
        {
            try
            {
                return base.ReadJson(reader, objectType, existingValue, serializer);
            }
            catch (JsonSerializationException)
            {
                return null;
            }
        }
    }
}