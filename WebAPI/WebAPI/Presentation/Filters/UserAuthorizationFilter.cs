using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Primitives;
using WebAPI.Core.Configuration;
using WebAPI.Core.Interfaces.Services;

namespace WebAPI.Presentation.Filters
{
    public class UserAuthorizationFilter : IAuthorizationFilter
    {
        private readonly ITokenGenerator _tokenGenerator;
        private readonly ITokenService _tokenService;
        private readonly AppSettings _appSettings;

        public UserAuthorizationFilter(
            ITokenGenerator tokenGenerator, 
            ITokenService tokenService, 
            AppSettings appSettings
            )
        {
            _tokenGenerator = tokenGenerator;
            _tokenService = tokenService;
            _appSettings = appSettings;
        }
        
        public async void OnAuthorization(AuthorizationFilterContext context)
        {
            var httpContext = context.HttpContext;
            
            //Check for token existing
            var tokenValue = httpContext.Request.Headers["Authorization"].ToString();
            var accessToken = tokenValue.Split(' ').Last();
            var refreshToken = httpContext.Request.Headers["Refresh-token"];

            if (refreshToken.Count == 0)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            //Check token for expiration
            var isExpired = _tokenGenerator.ValidateExpirationTime(accessToken);

            if (isExpired)
            {
                return;
            }

            var userId = httpContext.User.Claims.First(x => x.Type == ClaimTypes.Name).Value;
            
            //Update response with new access token
            var userEntity = await _tokenService.GetRefreshTokenByUserId(accessToken, new Guid(userId));
            var newAccessToken = _tokenGenerator.GenerateAccessToken(_appSettings, userEntity);
                
            httpContext.Response.Headers.Add(
                new KeyValuePair<string, StringValues>("Authorization", $"Bearer {newAccessToken}")
            );
        }
    }
}