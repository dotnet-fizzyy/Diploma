using WebAPI.Models.Models;

namespace WebAPI.Models.Result
{
    public class AuthenticationResponse
    {
        public Token AccessToken { get; set; }
        
        public Token RefreshToken { get; set; }
        
        public FullUser User { get; set; }
    }
}