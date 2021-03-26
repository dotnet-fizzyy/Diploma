namespace WebAPI.Models.Models.Authentication
{
    public abstract class BaseAuthenticationModel
    {
        public string UserName { get; set; }
        
        public string Password { get; set; }
    }
}