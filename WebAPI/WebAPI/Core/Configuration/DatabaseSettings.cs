namespace WebAPI.Core.Configuration
{
    public class DatabaseSettings
    {
        public string Host { get; set; }
        
        public int Port { get; set; }
        
        public string Database { get; set; }
        
        public string User { get; set; }
        
        public string Password { get; set; }

        public string ConnectionString => $"Host={Host};Port={Port};Database={Database};Username={User};Password={Password}";
    }
}