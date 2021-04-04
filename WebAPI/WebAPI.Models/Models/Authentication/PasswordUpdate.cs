namespace WebAPI.Models.Models.Authentication
{
    public class PasswordUpdate
    {
        public string OldPassword { get; set; }
        
        public string NewPassword { get; set; }
    }
}