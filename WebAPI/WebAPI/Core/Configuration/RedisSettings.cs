namespace WebAPI.Core.Configuration
{
    public class RedisSettings
    {
        public bool EnableRedis { get; set; }
        
        public string Host { get; set; }
        
        public int Port { get; set; }
        
        public int PoolSize { get; set; }
        
        public int ConnectionTimeOut { get; set; }

        public string ConnectionString => $"{Host}:{Port},connectTimeout={ConnectionTimeOut}";
    }
}