using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Core.Configuration;

namespace WebAPI.ApplicationLogic.Utilities
{
    public static class TokenGenerator
    {
        public static string GenerateAccessToken(AppSettings appSettings, Guid userId, string userName, string userRole)
        {
            var claims = GetClaims(userId, userName, userRole);

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(appSettings.Token.SigningKey));
            
            var jwtToken = new JwtSecurityToken(
                issuer: appSettings.Token.Issuer,
                audience: appSettings.Token.Audience,
                notBefore: DateTime.UtcNow,
                claims: claims.Claims,
                expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(appSettings.Token.LifeTime)),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            );
            
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwtToken);
            
            return encodedJwt;
        }

        public static string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];

            using (var randomNumberGenerator = RandomNumberGenerator.Create())
            {
                randomNumberGenerator.GetBytes(randomNumber);

                return Convert.ToBase64String(randomNumber);
            }
        }

        private static ClaimsIdentity GetClaims(Guid userId, string userName, string userRole)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(ClaimTypes.Role, userRole),
                new Claim(ClaimTypes.Name, userName),
            };
            
            var claimsIdentity = new ClaimsIdentity(
                claims, 
                "Token"
            );

            return claimsIdentity;
        }
    }
}