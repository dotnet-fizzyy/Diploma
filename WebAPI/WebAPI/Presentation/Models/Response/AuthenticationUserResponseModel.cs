using WebAPI.Models.Models.Result;

namespace WebAPI.Presentation.Models.Response
{
    public class AuthenticationUserResponseModel : AuthenticationResponseModel
    {
        public FullUser User { get; set; }
    }
}