using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using StackExchange.Redis;
using StackExchange.Redis.Extensions.Core.Abstractions;
using WebAPI.Core.Configuration;
using WebAPI.Core.Interfaces.Database;

namespace WebAPI.Infrastructure.Redis
{
    public class RedisContext : IRedisContext
    {
        private readonly IRedisCacheClient _redisCacheClient;
        private readonly ILogger<RedisContext> _logger;
        private readonly AppSettings _appSettings;

        public RedisContext(IRedisCacheClient redisCacheClient, ILogger<RedisContext> logger, AppSettings appSettings)
        {
            _redisCacheClient = redisCacheClient;
            _logger = logger;
            _appSettings = appSettings;
        }


        public async Task<T> Get<T>(string key)
        {
            try
            {
                var @string = await Redis().StringGetAsync(key);

                return @string.HasValue
                    ? JsonConvert.DeserializeObject<T>(@string)
                    : default;
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"The error was occured during getting string value from Redis by key: {key}");
                
                return default;
            }
        }

        public async Task Set<T>(string key, T value, TimeSpan? expiry = null)
        {
            try
            {
                var isSet = await Redis().StringSetAsync(key, JsonConvert.SerializeObject(value), expiry);
                if (!isSet)
                {
                    _logger.LogWarning($"String with {key} was not saved in Redis");
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"The error was occured during saving string value with {key} key in Redis");
            }
        }
        
        private IDatabase Redis()
        {
            if (_appSettings.Redis.EnableRedis)
            {
                return _redisCacheClient.GetDbFromConfiguration().Database;
            }

            return null;
        }
    }
}