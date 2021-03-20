using System;
using System.Text;

namespace WebAPI.ApplicationLogic.Utilities
{
    public static class PasswordHashing
    {
        public static string CreateHashPassword(string password)
        {
            var bytes = Encoding.UTF8.GetBytes(password);
            
            using (var hash = System.Security.Cryptography.SHA256.Create())
            {
                var hashedInputBytes = hash.ComputeHash(bytes);

                // Convert to text
                // StringBuilder Capacity is 128, because 512 bits / 8 bits in byte * 2 symbols for byte 
                var hashedInputStringBuilder = new StringBuilder();
                foreach (var hashByte in hashedInputBytes)
                    hashedInputStringBuilder.Append(hashByte.ToString("X2"));
                return hashedInputStringBuilder.ToString();
            }
        }

        public static bool VerifyPasswords(string password, string hashPassword)
        {
            var hashOfInput = CreateHashPassword(password);

            // Create a StringComparer an compare the hashes.
            var comparer = StringComparer.OrdinalIgnoreCase;

            return 0 == comparer.Compare(hashOfInput, hashPassword);
        }
    }
}