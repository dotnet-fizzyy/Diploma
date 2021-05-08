namespace WebAPI.Presentation.Constants
{
    public static class TokenTypes
    {
        public const string Access = "Access";
        public const string Refresh = "Refresh";
    }

    public static class RequestHeaders
    {
        public const string RefreshTokenHeader = "X-Refresh-Token";
    }
}