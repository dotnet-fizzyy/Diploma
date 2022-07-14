namespace WebAPI.Presentation.Models.Request
{
    public abstract class BaseAuthenticationRequestModel
    {
        public string Email { get; set; }
        
        public string Password { get; set; }
    }
}