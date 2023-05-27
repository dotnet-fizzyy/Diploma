using System;
using Microsoft.Extensions.DependencyInjection;

namespace WebAPI.Startup.Configuration
{
    public static class DependencyInjectionExtensions
    {
        public static void AddLazyTransient<T>(this IServiceCollection services) where T : class
        {
            RegisterLazyService<T>(services.AddTransient);
        }

        public static void AddLazyScoped<T>(this IServiceCollection services) where T : class
        {
            RegisterLazyService<T>(services.AddScoped);
        }

        public static void AddLazySingleton<T>(this IServiceCollection services) where T : class
        {
            RegisterLazyService<T>(services.AddSingleton);
        }

        private static void RegisterLazyService<T>(
            Func<Func<IServiceProvider, Lazy<T>>, IServiceCollection> serviceLifecycleMethod)
                where T : class
        {
            serviceLifecycleMethod(service =>
                new Lazy<T>(() =>
                    service.GetService<T>() ?? throw new ArgumentNullException($"{nameof(T)} instance is not registered")));
        }
    }
}