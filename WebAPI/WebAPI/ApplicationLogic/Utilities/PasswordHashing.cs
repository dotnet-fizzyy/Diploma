using System.Text;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;

namespace WebAPI.ApplicationLogic.Utilities
{
    public static class PasswordHashing
    {
        public static string CreateHashPassword(string password)
        {
            if (string.IsNullOrEmpty(password))
            {
                throw new UserFriendlyException(
                    ErrorStatus.INVALID_DATA, 
                    ExceptionMessageGenerator.GetInvalidDataMessage(nameof(password)));
            }
            
            var bytes = Encoding.UTF8.GetBytes(password);
            
            using (var hash = System.Security.Cryptography.SHA512.Create())
            {
                var hashedInputBytes = hash.ComputeHash(bytes);

                // Convert to text
                // StringBuilder Capacity is 128, because 512 bits / 8 bits in byte * 2 symbols for byte 
                var hashedInputStringBuilder = new StringBuilder();
                foreach (var hashByte in hashedInputBytes)
                {
                    hashedInputStringBuilder.Append(hashByte.ToString("X2"));
                }
                
                return hashedInputStringBuilder.ToString();
            }
        }
    }
}