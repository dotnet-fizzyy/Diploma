using Microsoft.AspNetCore.Mvc.Filters;

namespace WebAPI.Presentation.Filters
{
    public class UserAuthorizationFilter : IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {

        }
    }
}