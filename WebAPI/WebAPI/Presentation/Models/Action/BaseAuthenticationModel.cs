namespace WebAPI.Presentation.Models.Action
{
    public abstract class BaseAuthenticationModel
    {
        public string UserName { get; set; }
        
        public string Password { get; set; }
    }
}