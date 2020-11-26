namespace WebAPI.Presentation.Constants
{
    public static class TokenTypes
    {
        public const string Access = "Access";
        public const string Refresh = "Refresh";
    }

    public static class AuthorizationPolicies
    {
        public const string RefreshToken = nameof(RefreshToken);
    }

    public static class RequestHeaders
    {
        public const string UserHeader = "x-end-user";
    }
}