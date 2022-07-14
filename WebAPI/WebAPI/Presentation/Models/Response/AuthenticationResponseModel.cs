using WebAPI.Models.Models.Models;

namespace WebAPI.Presentation.Models.Response
{
    public class AuthenticationResponseModel
    {
        public Token AccessToken { get; set; }
        
        public Token RefreshToken { get; set; }
    }
}