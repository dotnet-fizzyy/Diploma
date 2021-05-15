using WebAPI.Models.Models.Result;

namespace WebAPI.Presentation.Models.Result
{
    public class AuthenticationUserResultModel : AuthenticationResultModel
    {
        public FullUser User { get; set; }
    }
}