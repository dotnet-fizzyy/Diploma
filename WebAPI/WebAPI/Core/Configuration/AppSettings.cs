namespace WebAPI.Core.Configuration
{
    public class AppSettings
    {
        public TokenSettings Token { get; set; }
        
        public DatabaseSettings Database { get; set; }
        
        public RedisSettings Redis { get; set; }
    }
}