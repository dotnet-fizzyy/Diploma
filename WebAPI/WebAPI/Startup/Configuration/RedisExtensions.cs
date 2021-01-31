using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis.Extensions.Core.Configuration;
using StackExchange.Redis.Extensions.Newtonsoft;
using WebAPI.Core.Configuration;

namespace WebAPI.Startup.Configuration
{
    public static class RedisExtensions
    {
        public static void RegisterRedis(this IServiceCollection services, RedisSettings redisSettings)
        {
            var redisConfiguration = new RedisConfiguration
            {
                ConnectTimeout = redisSettings.ConnectionTimeOut,
                PoolSize = redisSettings.PoolSize,
                Hosts = new[]
                {
                    new RedisHost
                    {
                        Host = redisSettings.Host,
                        Port = redisSettings.Port,
                    }
                }
            };

            services.AddStackExchangeRedisExtensions<NewtonsoftSerializer>(redisConfiguration);
        }
    }
}