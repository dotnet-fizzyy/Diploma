namespace WebAPI.Presentation.Models.Request
{
    public class SignUpUserRequestModel : BaseAuthenticationRequestModel
    {
        public string UserName { get; set; }
    }
}