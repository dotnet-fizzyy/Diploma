using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using WebAPI.Core.Configuration;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Core.Interfaces.Utilities;

namespace WebAPI.ApplicationLogic.Utilities
{
    public class TokenGenerator : ITokenGenerator
    {
        public string GenerateAccessToken(AppSettings appSettings, User user)
        {
            var claims = GetClaims(user);

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

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        public bool ValidateExpirationTime(string token)
        {
            var tokenSecurityHandler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = tokenSecurityHandler.ReadJwtToken(token);

            return DateTime.Now > jwtSecurityToken.ValidTo;
        }

        private static ClaimsIdentity GetClaims(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Id.ToString()),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, user.UserRole.ToString())
            };
            
            var claimsIdentity = new ClaimsIdentity(
                claims, 
                "Token", 
                ClaimsIdentity.DefaultNameClaimType, 
                ClaimsIdentity.DefaultRoleClaimType
            );

            return claimsIdentity;
        }
    }
}