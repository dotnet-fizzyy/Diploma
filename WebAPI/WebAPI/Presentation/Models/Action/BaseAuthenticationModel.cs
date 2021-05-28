namespace WebAPI.Presentation.Models.Action
{
    public abstract class BaseAuthenticationModel
    {
        public string Email { get; set; }
        
        public string Password { get; set; }
    }
}