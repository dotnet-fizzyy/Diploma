using System;

namespace WebAPI.ApplicationLogic.Utilities
{
    public static class RedisUtilities
    {
        public static string CreateRedisKeyForUser(Guid userId) => $"u_{userId}";
    }
}