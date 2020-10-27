using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using WebAPI.Core.Configuration;
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
            
            services.RegisterServices(appSettings);
            services.RegisterDatabase(databaseSettings);
            services.RegisterSwagger();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(options => options
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowAnyOrigin()
            );
            
            app.UseAuthentication();
            
            app.UseAuthorization();
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseHttpsRedirection();

            app.UseRouting();
            
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
            
            app.RegisterSwaggerUi();
        }

        private (
            DatabaseSettings databaseSettings, 
            TokenSettings tokenSettings
            ) RegisterSettings(IConfiguration configuration)
        {
            var databaseSettings = configuration.GetSection(nameof(AppSettings.Database)).Get<DatabaseSettings>();
            var tokenSettings = configuration.GetSection(nameof(AppSettings.Database)).Get<TokenSettings>();

            return (databaseSettings, tokenSettings);
        }
    }
}