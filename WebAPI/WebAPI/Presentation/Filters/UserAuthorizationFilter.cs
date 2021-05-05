using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WebAPI.Core.Configuration;
using WebAPI.Core.Interfaces.Utilities;
using WebAPI.Presentation.Constants;

namespace WebAPI.Presentation.Filters
{
    public class UserAuthorizationFilter : IAuthorizationFilter
    {
        private readonly ITokenGenerator _tokenGenerator;
        private readonly AppSettings _appSettings;

        public UserAuthorizationFilter(
            ITokenGenerator tokenGenerator,
            AppSettings appSettings
            )
        {
            _tokenGenerator = tokenGenerator;
            _appSettings = appSettings;
        }
        
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (!_appSettings.Token.EnableRefreshTokenVerification)
            {
                return;
            }
            
            
            var httpContext = context.HttpContext;

            //Check for token existing
            var tokenValue = httpContext.Request.Headers[RequestHeaders.AuthorizationHeader].ToString();
            var accessToken = tokenValue.Split(' ').Last();

            //Check token for expiration
            var isExpired = _tokenGenerator.ValidateExpirationTime(accessToken);

            if (isExpired)
            {
                context.Result = new UnauthorizedResult();
            }
        }
    }
}