namespace WebAPI.Presentation.Models.Request
{
    public class PasswordUpdateRequestModel
    {
        public string OldPassword { get; set; }
        
        public string NewPassword { get; set; }
    }
}