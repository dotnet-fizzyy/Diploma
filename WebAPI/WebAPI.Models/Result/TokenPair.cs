using WebAPI.Models.Models;

namespace WebAPI.Models.Result
{
    public class TokenPair
    {
        public Token AccessToken { get; set; }
        
        public Token RefreshToken { get; set; }
    }
}