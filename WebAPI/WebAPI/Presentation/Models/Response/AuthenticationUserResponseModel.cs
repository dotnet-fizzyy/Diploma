using WebAPI.Models.Complete;

namespace WebAPI.Presentation.Models.Response
{
    public class AuthenticationUserResponseModel : AuthenticationResponseModel
    {
        public UserComplete User { get; set; }
    }
}