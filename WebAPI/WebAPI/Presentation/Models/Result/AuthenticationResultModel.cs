using WebAPI.Models.Models.Models;

namespace WebAPI.Presentation.Models.Result
{
    public class AuthenticationResultModel
    {
        public Token AccessToken { get; set; }
        
        public Token RefreshToken { get; set; }
    }
}