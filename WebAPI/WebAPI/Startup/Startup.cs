using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
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
            
            services.AddControllers();

            services.AddControllers(options =>
            {
                options.Filters.Add(typeof(UserAuthorizationFilter));
            });
            
            services.RegisterAuthSettings(tokenSettings);
            services.RegisterServices(appSettings);
            services.RegisterDatabase(databaseSettings);
            services.RegisterSwagger();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(options => options
                .SetIsOriginAllowed(_ => true)
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
            );
            
            app.UseRouting();
            
            app.UseAuthentication();
            app.UseAuthorization();
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.RegisterExceptionHandler();
            
            app.UseEndpoints(endpoints => endpoints.MapControllers());
            
            app.RegisterSwaggerUi();
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
}