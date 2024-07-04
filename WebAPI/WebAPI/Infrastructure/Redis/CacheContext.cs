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
    public class CacheContext : ICacheContext
    {
        private readonly IRedisCacheClient _redisCacheClient;
        private readonly ILogger<CacheContext> _logger;

        private readonly bool _enableCache;

        public CacheContext(AppSettings appSettings)
        {
            _enableCache = appSettings.Redis.EnableRedis;
        }

        public CacheContext(
            IRedisCacheClient redisCacheClient,
            ILogger<CacheContext> logger,
            AppSettings appSettings) : this(appSettings)
        {
            _redisCacheClient = redisCacheClient;
            _logger = logger;
        }

        public async Task<T> Get<T>(string key)
        {
            if (!_enableCache)
            {
                return default;
            }

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
            if (!_enableCache)
            {
                return;
            }

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

        private IDatabase Redis() =>
            _redisCacheClient.GetDbFromConfiguration().Database;
    }
}