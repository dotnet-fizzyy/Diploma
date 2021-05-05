using WebAPI.Models.Models.Models;

namespace WebAPI.Models.Models.Result
{
    public class AuthenticationResultModel
    {
        public Token AccessToken { get; set; }
        
        public Token RefreshToken { get; set; }
    }
}